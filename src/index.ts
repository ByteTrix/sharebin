import xss from 'xss';

import { CloudflareEnv, getEnv } from './env';
import { Router } from './router';
import { Paste, createStorage } from './storage';
import { handleScheduled } from './cron';
import { ModernMarkdownProcessor } from './markdown';
import { ServerEncryption, EncryptedData } from './encryption';
import { GUIDE_CONTENT } from './guide-content';
import {
  deletePage,
  editPage,
  errorPage,
  guidePage,
  homePage,
  pastePage,
  passwordPromptPage,
} from './templates';

const MIMES: Record<string, string> = {
  'js': 'text/javascript',
  'css': 'text/css',
  'ico': 'image/vnd.microsoft.icon',
};

const XSS_OPTIONS = {
  whiteList: {
    // Headings
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
    h5: ['id'],
    h6: ['id'],
    // Text formatting
    p: [],
    br: [],
    strong: [],
    b: [],
    em: [],
    i: [],
    u: [],
    s: [],
    del: [],
    ins: [],
    mark: [],
    small: [],
    sub: [],
    sup: ['id', 'data-footnote-ref'], // Footnote references
    // Links
    a: ['href', 'title', 'target', 'data-footnote-ref', 'data-footnote-backref', 'id'],
    // Lists
    ul: [],
    ol: ['start', 'type'], // Includes footnote lists
    li: ['id', 'data-footnote-def'], // Includes footnote list items
    // Quotes and code
    blockquote: [],
    code: ['class'],
    pre: ['class'],
    // Tables
    table: ['class'],
    thead: [],
    tbody: [],
    tr: [],
    th: ['align', 'colspan', 'rowspan'],
    td: ['align', 'colspan', 'rowspan'],
    // Images
    img: ['src', 'alt', 'title', 'width', 'height'],
    // Dividers
    hr: [],
    // Task lists
    input: ['disabled', 'type', 'checked'],
    // Containers
    div: ['class'],
    span: ['class'],
    // Footnotes (GitHub Flavored Markdown)
    section: ['data-footnotes', 'class'],
  },
  stripIgnoreTag: false,
  stripIgnoreTagBody: false,
  allowCommentTag: false,
};

function createParser() {
  const processor = new ModernMarkdownProcessor();
  
  return async (markdown: string) => {
    const result = await processor.process(markdown, { 
      toc: true,  // Re-enable TOC generation
      codeHighlighting: true 
    });
    return { 
      title: result.title, 
      html: result.html 
    };
  };
}

function uid() {
  // https://github.com/lukeed/uid
  // MIT License
  // Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
  let IDX = 36, HEX = '';
  while (IDX--) HEX += IDX.toString(36);

  return () => {
    let str = '', num = 6;
    while (num--) str += HEX[Math.random() * 36 | 0];
    return str;
  };
}

function createSlug(text = '') {
  const lines = text.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const slug = lines[i].toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text

    if (slug.length > 0) return slug;
  }

  return '';
}

export default {
  async fetch(request: Request, env: CloudflareEnv, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    
    // First, try to serve static files from ASSETS
    try {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404) {
        return assetResponse;
      }
    } catch (error) {
      // If ASSETS.fetch fails, continue to application logic
      console.log('Static file serving error:', error);
    }

    const { MODE, DEMO_CLEAR_INTERVAL, KV } = getEnv(env);
    const storage = createStorage(KV);
    const generateId = uid();
    const app = new Router();

    app.get('/', () => {
      return new Response(homePage({ mode: MODE }), {
        status: 200,
        headers: { 'content-type': 'text/html' },
      });
    });

    app.get('/guide', async (req) => {
      try {
        const parse = createParser();
        const { html, title } = await parse(GUIDE_CONTENT);

        return new Response(guidePage({ html, title, mode: MODE }), {
          status: 200,
          headers: { 'content-type': 'text/html' },
        });
      } catch (error) {
        console.error('Error loading guide:', error);
        return new Response(errorPage(MODE), {
          status: 404,
          headers: { 'content-type': 'text/html' },
        });
      }
    });

    app.get('/:id', async (req, params) => {
      let contents = '';
      let status = 200;
      const id = params.id as string ?? '';
      const res = await storage.get(id);

      if (res.value !== null) {
        const { paste, isEncrypted } = res.value;
        
        // Check if this is an encrypted paste that needs password
        if (isEncrypted) {
          // Check if user has provided password in cookie
          const cookies = req.headers.get('cookie') || '';
          const sessionCookie = cookies
            .split(';')
            .find(c => c.trim().startsWith(`decrypt-session-${id}=`));
          
          if (!sessionCookie) {
            // Show password prompt
            contents = passwordPromptPage({ id, mode: MODE });
            return new Response(contents, {
              status: 200,
              headers: { 'content-type': 'text/html' },
            });
          }
          
          const sessionPassword = sessionCookie.split('=')[1];
          
          // Try to decrypt with session password
          try {
            if (ServerEncryption.isEncryptedData(JSON.parse(paste))) {
              const encryptedData = JSON.parse(paste) as EncryptedData;
              const decryptedPaste = await ServerEncryption.decrypt(encryptedData, sessionPassword);
              
              const parse = createParser();
              let { html, title } = await parse(decryptedPaste);
              html = xss(html, XSS_OPTIONS);
              if (!title) title = id;

              const revisions = await storage.getRevisions(id);
              contents = pastePage({ id, html, title, mode: MODE, revisions, isEncrypted: true });
            } else {
              throw new Error('Invalid encrypted data format');
            }
          } catch (error) {
            // Invalid password, show prompt again
            contents = passwordPromptPage({ id, mode: MODE, error: 'Invalid password' });
            return new Response(contents, {
              status: 200,
              headers: { 'content-type': 'text/html' },
            });
          }
        } else {
          // Regular unencrypted paste
          const parse = createParser();
          let { html, title } = await parse(paste);
          html = xss(html, XSS_OPTIONS);
          if (!title) title = id;

          const revisions = await storage.getRevisions(id);
          contents = pastePage({ 
            id, 
            html, 
            title, 
            mode: MODE, 
            revisions, 
            isEncrypted: false
          });
        }
        
        status = 200;
      } else {
        contents = errorPage(MODE);
        status = 404;
      }

      return new Response(contents, {
        status,
        headers: {
          'content-type': 'text/html',
        },
      });
    });

    app.get('/:id/edit', async (req, params) => {
      let contents = '';
      let status = 200;
      const id = params.id as string ?? '';
      const url = new URL(req.url);
      const revisionTimestamp = url.searchParams.get('revision');

      let pasteContent = '';
      let hasEditCode = false;
      let isEncrypted = false;

      if (revisionTimestamp) {
        const revisions = await storage.getRevisions(id);
        const revision = revisions.find(rev => rev.timestamp === parseInt(revisionTimestamp, 10));
        if (revision) {
          pasteContent = revision.paste;
          // For historical revisions, we don't have an edit code associated directly
          // with the revision itself, so we'll use the current paste's edit code status.
          const currentPaste = await storage.get(id);
          hasEditCode = Boolean(currentPaste.value?.editCode);
          isEncrypted = Boolean(currentPaste.value?.isEncrypted);
        } else {
          contents = errorPage(MODE);
          status = 404;
        }
      } else {
        const res = await storage.get(id);
        if (res.value !== null) {
          pasteContent = res.value.paste;
          hasEditCode = Boolean(res.value.editCode);
          isEncrypted = Boolean(res.value.isEncrypted);
          
          // If it's encrypted, we need to decrypt it for editing
          if (isEncrypted) {
            const cookies = req.headers.get('cookie') || '';
            const sessionCookie = cookies
              .split(';')
              .find(c => c.trim().startsWith(`decrypt-session-${id}=`));
            
            if (sessionCookie) {
              const sessionPassword = sessionCookie.split('=')[1];
              try {
                const encryptedData = JSON.parse(pasteContent) as EncryptedData;
                pasteContent = await ServerEncryption.decrypt(encryptedData, sessionPassword);
              } catch (error) {
                // Can't decrypt, redirect to view page for password prompt
                return new Response('', {
                  status: 302,
                  headers: { 'location': `/${id}` },
                });
              }
            } else {
              // No session, redirect to view page for password prompt
              return new Response('', {
                status: 302,
                headers: { 'location': `/${id}` },
              });
            }
          }
        } else {
          contents = errorPage(MODE);
          status = 404;
        }
      }

      if (status !== 404) {
        contents = editPage({ id, paste: pasteContent, hasEditCode, mode: MODE });
      }

      return new Response(contents, {
        status,
        headers: {
          'content-type': 'text/html',
        },
      });
    });

    app.get('/:id/delete', async (_req, params) => {
      let contents = '';
      let status = 200;

      const id = params.id as string ?? '';
      const res = await storage.get(id);

      if (res.value !== null) {
        const { editCode } = res.value;
        const hasEditCode = Boolean(editCode);
        contents = deletePage({ id, hasEditCode, mode: MODE });
      } else {
        contents = errorPage(MODE);
        status = 404;
      }

      return new Response(contents, {
        status,
        headers: {
          'content-type': 'text/html',
        },
      });
    });

    app.get('/:id/raw', async (req, params) => {
      let contents = '';
      let status = 200;
      let contentType = 'text/plain';
      const id = params.id as string ?? '';
      const url = new URL(req.url);
      const revisionTimestamp = url.searchParams.get('revision');

      if (revisionTimestamp) {
        const revisions = await storage.getRevisions(id);
        const revision = revisions.find(rev => rev.timestamp === parseInt(revisionTimestamp, 10));
        if (revision) {
          contents = revision.paste;
          status = 200;
        } else {
          contents = errorPage(MODE);
          status = 404;
          contentType = 'text/html';
        }
      } else {
        const res = await storage.get(id);

        if (res.value !== null) {
          const { paste } = res.value;
          contents = paste;
          status = 200;
        } else {
          contents = errorPage(MODE);
          status = 404;
          contentType = 'text/html';
        }
      }

      return new Response(contents, {
        status,
        headers: {
          'content-type': contentType,
        },
      });
    });

    app.post('/preview', async (req) => {
      try {
        const body = await req.json() as { content?: string };
        const content = body.content || '';
        
        if (!content.trim()) {
          return new Response('', {
            status: 200,
            headers: { 'content-type': 'text/html' },
          });
        }

        const parse = createParser();
        const { html } = await parse(content);
        const sanitizedHtml = xss(html, XSS_OPTIONS);

        return new Response(sanitizedHtml, {
          status: 200,
          headers: { 'content-type': 'text/html' },
        });
      } catch (error) {
        console.error('Preview error:', error);
        return new Response('Preview error', {
          status: 500,
          headers: { 'content-type': 'text/plain' },
        });
      }
    });

    app.post('/save', async (req) => {
      let status = 302;
      let contents = '';
      const headers = new Headers({
        'content-type': 'text/html',
      });

      const form = await req.formData();
      const customUrl = form.get('url') as string;
      let paste = form.get('paste') as string;
      const slug = createSlug(customUrl);
      const enableEncryption = form.get('enableEncryption') === 'on';
      const encryptionPassword = form.get('encryptionPassword') as string;

      let editCode: string | undefined = form.get('editcode') as string;
      if (typeof editCode === 'string') {
        editCode = editCode.trim() || undefined;
      }

      // Handle encryption
      let isEncrypted = false;
      
      if (enableEncryption && encryptionPassword) {
        // Always use server-side encryption
        try {
          const encryptedData = await ServerEncryption.encrypt(paste, encryptionPassword);
          paste = JSON.stringify(encryptedData);
          isEncrypted = true;
        } catch (error) {
          status = 422;
          contents = homePage({
            paste,
            url: customUrl,
            errors: { url: 'Encryption failed. Please try again.' },
            mode: MODE,
          });
          return new Response(contents, { status, headers });
        }
      }

      const pasteData: Paste = {
        paste,
        editCode,
        isEncrypted,
      };

      if (slug.length > 0) {
        const res = await storage.get(slug);

        if (slug === 'guide' || res.value !== null) {
          status = 422;

          contents = homePage({
            paste: form.get('paste') as string, // Show original paste, not encrypted
            url: customUrl,
            errors: { url: `url unavailable: ${customUrl}` },
            mode: MODE,
          });
        } else {
          await storage.set(slug, pasteData);
          status = 302;
          headers.set('location', '/' + slug.trim());
        }
      } else {
        let id = '';
        let exists = true;

        for (; exists;) {
          id = generateId();
          exists = await storage.get(id).then(
            (r) => r.value !== null,
          );
        }

        await storage.set(id, pasteData);
        status = 302;
        headers.set('location', '/' + id.trim());
      }

      return new Response(contents, {
        status,
        headers,
      });
    });

    app.post('/:id/save', async (req, params) => {
      let contents = '302';
      let status = 302;

      const id = params.id as string ?? '';
      const form = await req.formData();
      let paste = form.get('paste') as string;
      let editCode: string | undefined = form.get('editcode') as string;
      if (typeof editCode === 'string') {
        editCode = editCode.trim() || undefined;
      }

      const headers = new Headers({
        'content-type': 'text/html',
      });

      if (id.trim().length === 0) {
        headers.set('location', '/');
      } else {
        const res = await storage.get(id);
        const existing = res.value as Paste;
        const hasEditCode = Boolean(existing.editCode);

        if (
          hasEditCode &&
          existing.editCode !== editCode
        ) {
          // editCode mismatch
          status = 400;
          contents = editPage({
            id,
            paste,
            hasEditCode,
            errors: { editCode: 'invalid edit code' },
            mode: MODE,
          });
        } else {
          await storage.saveRevision(id, existing.paste); // Save current version as a revision
          
          // If the original paste was encrypted, we need to re-encrypt the updated content
          if (existing.isEncrypted) {
            const cookies = req.headers.get('cookie') || '';
            const sessionCookie = cookies
              .split(';')
              .find(c => c.trim().startsWith(`decrypt-session-${id}=`));
            
            if (sessionCookie) {
              const sessionPassword = sessionCookie.split('=')[1];
              try {
                const encryptedData = await ServerEncryption.encrypt(paste, sessionPassword);
                paste = JSON.stringify(encryptedData);
              } catch (error) {
                status = 400;
                contents = editPage({
                  id,
                  paste,
                  hasEditCode,
                  errors: { editCode: 'Encryption failed. Please try again.' },
                  mode: MODE,
                });
                return new Response(contents, { status, headers });
              }
            } else {
              // No session, redirect to view for password prompt
              headers.set('location', `/${id}`);
              return new Response(contents, { status, headers });
            }
          }
          
          await storage.set(id, { 
            ...existing, 
            paste,
            editCode: editCode || existing.editCode 
          });
          headers.set('location', '/' + id);
        }
      }

      return new Response(contents, {
        status,
        headers,
      });
    });

    app.post('/:id/delete', async (req, params) => {
      let contents = '302';
      let status = 302;
      const headers = new Headers({
        'content-type': 'text/html',
      });

      const id = params.id as string ?? '';
      const form = await req.formData();
      let editCode: string | undefined = form.get('editcode') as string;
      if (typeof editCode === 'string') {
        editCode = editCode.trim() || undefined;
      }

      if (id.trim().length === 0) {
        headers.set('location', '/');
      } else {
        const res = await storage.get(id);
        const existing = res.value as Paste;
        const hasEditCode = Boolean(existing.editCode);

        if (
          hasEditCode &&
          existing.editCode !== editCode
        ) {
          // editCode mismatch
          status = 400;
          contents = deletePage({
            id,
            hasEditCode,
            errors: { editCode: 'invalid edit code' },
            mode: MODE,
          });
        } else {
          await storage.delete(id);
          headers.set('location', '/');
        }
      }

      return new Response(contents, {
        status,
        headers,
      });
    });

    app.post('/:id/decrypt', async (req, params) => {
      const id = params.id as string ?? '';
      const form = await req.formData();
      const password = form.get('password') as string;

      if (!password) {
        return new Response(passwordPromptPage({ id, mode: MODE, error: 'Password is required' }), {
          status: 400,
          headers: { 'content-type': 'text/html' },
        });
      }

      const res = await storage.get(id);
      if (res.value === null) {
        return new Response(errorPage(MODE), {
          status: 404,
          headers: { 'content-type': 'text/html' },
        });
      }

      const { paste, isEncrypted } = res.value;
      
      if (!isEncrypted) {
        return new Response(passwordPromptPage({ id, mode: MODE, error: 'This paste is not encrypted' }), {
          status: 400,
          headers: { 'content-type': 'text/html' },
        });
      }

      try {
        const encryptedData = JSON.parse(paste) as EncryptedData;
        const decryptedPaste = await ServerEncryption.decrypt(encryptedData, password);
        
        // Create a session cookie for this decrypt
        return new Response('', {
          status: 302,
          headers: {
            'location': `/${id}`,
            'set-cookie': `decrypt-session-${id}=${password}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`,
          },
        });
      } catch (error) {
        console.error('Decryption error:', error);
        return new Response(passwordPromptPage({ id, mode: MODE, error: 'Invalid password. Please try again.' }), {
          status: 400,
          headers: { 'content-type': 'text/html' },
        });
      }
    });

    return await app.handler(request);
  },

  async scheduled(event: any, env: CloudflareEnv, ctx: any): Promise<void> {
    return handleScheduled(event, env, ctx);
  },
};
