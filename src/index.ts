import xss from 'xss';

import { CloudflareEnv, getEnv } from './env';
import { Router } from './router';
import { Paste, createStorage } from './storage';
import { handleScheduled } from './cron';
import { ModernMarkdownProcessor } from './markdown';
import { ServerEncryption, EncryptedData } from './encryption';
import { GUIDE_CONTENT } from './guide-content';
import {
  aboutPage,
  deletePage,
  editPage,
  errorPage,
  guidePage,
  homePage,
  noteCreatedPage,
  oneTimeViewWarningPage,
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
    
    // First, try to serve static files from ASSETS (if available)
    if (env.ASSETS) {
      try {
        const assetResponse = await env.ASSETS.fetch(request);
        if (assetResponse.status !== 404) {
          return assetResponse;
        }
      } catch (error) {
        // If ASSETS.fetch fails, continue to application logic
        console.log('Static file serving error:', error);
      }
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

    app.get('/about', () => {
      return new Response(aboutPage({ mode: MODE }), {
        status: 200,
        headers: { 'content-type': 'text/html' },
      });
    });

    app.get('/created/:id', async (req, params) => {
      const id = params.id as string ?? '';
      const url = new URL(req.url);
      const fullUrl = `${url.protocol}//${url.host}/${id}`;
      
      // Verify that the note exists
      const res = await storage.get(id);
      if (res.value === null) {
        return new Response(errorPage(MODE), {
          status: 404,
          headers: { 'content-type': 'text/html' },
        });
      }

      return new Response(noteCreatedPage({ id, url: fullUrl, mode: MODE }), {
        status: 200,
        headers: { 'content-type': 'text/html' },
      });
    });

    app.get('/:id', async (req, params) => {
      let contents = '';
      let status = 200;
      const id = params.id as string ?? '';
      const url = new URL(req.url);
      const confirmView = url.searchParams.get('confirm') === 'true';
      
      // First check if paste exists without consuming it
      const res = await storage.get(id, false);

      if (res.value !== null) {
        const { paste, isEncrypted, isPasswordProtected, oneTimeView } = res.value;
        
        // Show warning page for one-time view content unless confirmed
        if (oneTimeView && !confirmView) {
          contents = oneTimeViewWarningPage({ id, mode: MODE });
          return new Response(contents, {
            status: 200,
            headers: { 'content-type': 'text/html' },
          });
        }
        
        // For encrypted content, always show paste page
        // Client will handle decryption
        console.log('Paste encryption status:', { isEncrypted, isPasswordProtected });
        
        // Now consume the paste (for one-time view)
        const finalRes = await storage.get(id, true);
        if (finalRes.value === null) {
          contents = errorPage(MODE);
          status = 404;
        } else {
          const finalPaste = finalRes.value;
          
          // Pass encrypted content to client
          const revisions = await storage.getRevisions(id);
          const attachments = finalPaste.attachments || [];
          
          if (finalPaste.isEncrypted) {
            console.log('Displaying encrypted paste for client-side decryption with attachments:', attachments.length);
            contents = pastePage({ 
              id, 
              html: finalPaste.paste, // Raw encrypted content
              title: id, 
              mode: MODE, 
              revisions, 
              isEncrypted: true,
              isPasswordProtected: finalPaste.isPasswordProtected || false,
              attachments 
            });
          } else {
            // Fallback for old unencrypted content
            const parse = createParser();
            let { html, title } = await parse(finalPaste.paste);
            html = xss(html, XSS_OPTIONS);
            if (!title) title = id;

            console.log('Displaying unencrypted paste with attachments:', attachments.length);
            contents = pastePage({
              id,
              html,
              title,
              mode: MODE,
              revisions,
              isEncrypted: false,
              isPasswordProtected: false,
              attachments
            });
          }
          
          status = 200;
        }
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
      let isPasswordProtected = false;

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
          isPasswordProtected = Boolean(currentPaste.value?.isPasswordProtected);
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
          isPasswordProtected = Boolean(res.value.isPasswordProtected);
          
          // For encrypted content, pass the raw encrypted content to the edit page
          // The client will handle decryption for editing
          console.log('Edit page encryption status:', { isEncrypted, isPasswordProtected });
        } else {
          contents = errorPage(MODE);
          status = 404;
        }
      }

      if (status !== 404) {
        const res = await storage.get(id);
        const existingAttachments = res.value?.attachments || [];
        contents = editPage({ 
          id, 
          paste: pasteContent, 
          hasEditCode, 
          isEncrypted,
          isPasswordProtected,
          mode: MODE, 
          existingAttachments 
        });
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
      // Note: encryptionPassword is used only for client-side encryption and never stored
      const encryptionPassword = form.get('encryptionPassword') as string;
      const isEncrypted = form.get('isEncrypted') === 'true';
      const isPasswordProtected = form.get('isPasswordProtected') === 'true';
      const enableOneTimeView = form.get('enableOneTimeView') === 'on';
      const expiryTimestamp = form.get('expiryTimestamp') as string;
      const customExpiryDate = form.get('customExpiryDate') as string;

      let editCode: string | undefined = form.get('editcode') as string;
      if (typeof editCode === 'string') {
        editCode = editCode.trim() || undefined;
      }

      // Security: Clear password from memory after use (if accessed)
      if (encryptionPassword) {
        // Password is only used client-side for encryption, never stored server-side
        console.log('Password received for client-side encryption (not stored)');
      }

      // Handle file attachments
      const attachments: any[] = [];
      const fileAttachments = form.getAll('fileAttachment') as File[];
      
      console.log('File attachments check:', {
        count: fileAttachments.length,
        files: fileAttachments.map(f => ({ name: f.name, size: f.size, type: f.type }))
      });
      
      for (const fileAttachment of fileAttachments) {
        if (fileAttachment && fileAttachment.size > 0 && fileAttachment.name) {
          const attachmentId = generateId();
          const fileBuffer = await fileAttachment.arrayBuffer();
          
          console.log('Processing attachment:', { attachmentId, name: fileAttachment.name, bufferSize: fileBuffer.byteLength });
          
          // Store the file in KV
          await storage.storeAttachment(attachmentId, fileBuffer);
          
          // Add attachment info
          attachments.push({
            id: attachmentId,
            originalName: fileAttachment.name,
            size: fileAttachment.size,
            type: fileAttachment.type,
            uploadTimestamp: Date.now(),
          });
          
          console.log('Attachment stored:', attachments[attachments.length - 1]);
        }
      }
      
      console.log('Final attachments array:', attachments);

      // Calculate expiry time
      let expiryTime: number | undefined;
      
      if (expiryTimestamp) {
        expiryTime = parseInt(expiryTimestamp, 10);
        if (isNaN(expiryTime) || expiryTime <= Date.now()) {
          expiryTime = undefined;
        }
      } else if (customExpiryDate) {
        // Handle custom date format from datetime-local input
        const customDate = new Date(customExpiryDate);
        if (customDate.getTime() > Date.now()) {
          expiryTime = customDate.getTime();
        }
      }
      
      console.log('Expiry processing:', {
        expiryTimestamp,
        customExpiryDate,
        calculatedExpiryTime: expiryTime,
        now: Date.now()
      });

      // All content is now encrypted client-side
      console.log('Client-side encryption:', { isEncrypted, isPasswordProtected });

      const pasteData: Paste = {
        paste,
        editCode,
        isEncrypted,
        isPasswordProtected,
        oneTimeView: enableOneTimeView,
        expiryTime,
        viewCount: 0,
        attachments,
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
          headers.set('location', '/created/' + slug.trim());
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
        headers.set('location', '/created/' + id.trim());
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

        // Use robust edit code validation
        const validation = await storage.validateEditCode(id, editCode || '');
        
        if (!validation.valid) {
          status = 400;
          contents = editPage({
            id,
            paste,
            hasEditCode,
            isEncrypted: existing.isEncrypted || false,
            isPasswordProtected: existing.isPasswordProtected || false,
            errors: { editCode: validation.error || 'Invalid edit code' },
            mode: MODE,
          });
        } else {
          await storage.saveRevision(id, existing.paste); // Save current version as a revision
          
          // Handle attachment removal
          const attachmentsToRemove = form.getAll('removeAttachment') as string[];
          let existingAttachments = existing.attachments || [];
          
          // Remove attachments marked for deletion
          for (const attachmentId of attachmentsToRemove) {
            existingAttachments = existingAttachments.filter((att: any) => att.id !== attachmentId);
            // Also remove from KV storage
            try {
              await storage.deleteAttachment(attachmentId);
            } catch (error) {
              console.error('Failed to delete attachment:', attachmentId, error);
            }
          }
          
          // Handle file attachments for edit
          const newAttachments: any[] = [];
          const fileAttachments = form.getAll('fileAttachment') as File[];
          
          for (const fileAttachment of fileAttachments) {
            if (fileAttachment && fileAttachment.size > 0 && fileAttachment.name) {
              const attachmentId = generateId();
              const fileBuffer = await fileAttachment.arrayBuffer();
              
              // Store the file in KV
              await storage.storeAttachment(attachmentId, fileBuffer);
              
              // Add attachment info
              newAttachments.push({
                id: attachmentId,
                originalName: fileAttachment.name,
                size: fileAttachment.size,
                type: fileAttachment.type,
                uploadTimestamp: Date.now(),
              });
            }
          }
          
          // Client-side encryption - paste content is already encrypted when it arrives
          // No need to re-encrypt here as it's handled on the client side
          
          // Combine existing and new attachments
          const allAttachments = [...existingAttachments, ...newAttachments];
          
          await storage.set(id, {
            ...existing,
            paste, // Already encrypted by client if needed
            editCode: editCode || existing.editCode,
            attachments: allAttachments
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

        // Use robust edit code validation
        const validation = await storage.validateEditCode(id, editCode || '');
        
        if (!validation.valid) {
          status = 400;
          contents = deletePage({
            id,
            hasEditCode,
            errors: { editCode: validation.error || 'Invalid edit code' },
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
            'set-cookie': `decrypt-session-${id}=${encodeURIComponent(password)}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`,
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

    // Handle revision restore
    app.post('/:id/restore/:timestamp', async (req, params) => {
      const id = params.id as string ?? '';
      const timestamp = params.timestamp as string ?? '';
      
      try {
        const res = await storage.get(id);
        if (res.value === null) {
          return new Response(JSON.stringify({ error: 'Paste not found' }), {
            status: 404,
            headers: { 'content-type': 'application/json' },
          });
        }

        const revisions = await storage.getRevisions(id);
        const revision = revisions.find(rev => rev.timestamp === parseInt(timestamp, 10));
        
        if (!revision) {
          return new Response(JSON.stringify({ error: 'Revision not found' }), {
            status: 404,
            headers: { 'content-type': 'application/json' },
          });
        }

        const existing = res.value as Paste;
        
        // Save current version as a revision before restoring
        await storage.saveRevision(id, existing.paste);
        
        // Restore the revision
        await storage.set(id, {
          ...existing,
          paste: revision.paste,
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      } catch (error) {
        console.error('Restore error:', error);
        return new Response(JSON.stringify({ error: 'Restore failed' }), {
          status: 500,
          headers: { 'content-type': 'application/json' },
        });
      }
    });

    // Handle file uploads
    app.post('/upload', async (req) => {
      try {
        const form = await req.formData();
        const file = form.get('file') as File;
        
        if (!file) {
          return new Response(JSON.stringify({ error: 'No file provided' }), {
            status: 400,
            headers: { 'content-type': 'application/json' },
          });
        }

        // Generate unique attachment ID
        const attachmentId = generateId();
        
        // Store file data in KV
        const fileBuffer = await file.arrayBuffer();
        await storage.storeAttachment(attachmentId, fileBuffer);
        
        // Return attachment info
        const attachmentInfo = {
          id: attachmentId,
          originalName: file.name,
          size: file.size,
          type: file.type,
          uploadTimestamp: Date.now(),
        };

        return new Response(JSON.stringify(attachmentInfo), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        });
      } catch (error) {
        console.error('File upload error:', error);
        return new Response(JSON.stringify({ error: 'File upload failed' }), {
          status: 500,
          headers: { 'content-type': 'application/json' },
        });
      }
    });

    // Handle attachment downloads
    app.get('/attachment/:id', async (req, params) => {
      const attachmentId = params.id as string ?? '';
      const url = new URL(req.url);
      const pasteId = url.searchParams.get('paste');
      const action = url.searchParams.get('action') || 'download'; // 'download' or 'view'
      
      try {
        // Get attachment metadata from paste
        let attachmentInfo = null;
        if (pasteId) {
          const pasteRes = await storage.get(pasteId);
          if (pasteRes.value && pasteRes.value.attachments) {
            attachmentInfo = pasteRes.value.attachments.find((att: any) => att.id === attachmentId);
          }
        }
        
        const fileData = await storage.getAttachment(attachmentId);
        
        if (!fileData) {
          return new Response('Attachment not found', {
            status: 404,
            headers: { 'content-type': 'text/plain' },
          });
        }

        // Determine filename and content type
        const filename = attachmentInfo ? attachmentInfo.originalName : attachmentId;
        const contentType = attachmentInfo ? attachmentInfo.type : 'application/octet-stream';
        
        // Handle view vs download
        if (action === 'view' && contentType.startsWith('text/')) {
          return new Response(fileData, {
            status: 200,
            headers: {
              'content-type': contentType,
              'content-disposition': `inline; filename="${filename}"`,
            },
          });
        } else {
          // Always download for non-text files or when explicitly requested
          return new Response(fileData, {
            status: 200,
            headers: {
              'content-type': 'application/octet-stream',
              'content-disposition': `attachment; filename="${filename}"`,
            },
          });
        }
      } catch (error) {
        console.error('Attachment download error:', error);
        return new Response('Attachment download failed', {
          status: 500,
          headers: { 'content-type': 'text/plain' },
        });
      }
    });

    return await app.handler(request);
  },

  async scheduled(event: any, env: CloudflareEnv, ctx: any): Promise<void> {
    return handleScheduled(event, env, ctx);
  },
};
