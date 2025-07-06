import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

interface TocItem {
  level: number;
  text: string;
  anchor: string;
  subitems: TocItem[];
}

interface MarkdownProcessorOptions {
  toc?: boolean;
  codeHighlighting?: boolean;
}

interface MarkdownResult {
  title: string;
  html: string;
  toc: TocItem[];
  frontmatter?: Record<string, any>;
}

export class ModernMarkdownProcessor {
  private tocItems: TocItem[] = [];

  private createSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  private extractHeadings = () => {
    return (tree: any) => {
      this.tocItems = [];
      
      const visit = (node: any) => {
        if (node.type === 'heading' && node.depth >= 1 && node.depth <= 6) {
          const text = this.extractTextFromNode(node);
          const anchor = this.createSlug(text);
          
          this.tocItems.push({
            level: node.depth,
            text,
            anchor,
            subitems: []
          });

          // Add id to heading for anchor links
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.id = anchor;
        }

        if (node.children) {
          node.children.forEach(visit);
        }
      };

      visit(tree);
    };
  };

  private extractTextFromNode(node: any): string {
    if (node.type === 'text') {
      return node.value;
    }
    
    if (node.children) {
      return node.children.map((child: any) => this.extractTextFromNode(child)).join('');
    }
    
    return '';
  }

  private addHeadingAnchors = () => {
    return (tree: any) => {
      const visit = (node: any) => {
        if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
          const id = node.properties?.id;
          if (id) {
            // Wrap heading content in anchor link
            const textContent = this.extractElementText(node);
            node.children = [{
              type: 'element',
              tagName: 'a',
              properties: { href: `#${id}` },
              children: node.children
            }];
          }
        }

        if (node.children) {
          node.children.forEach(visit);
        }
      };

      visit(tree);
    };
  };

  private extractElementText(element: any): string {
    if (element.type === 'text') {
      return element.value;
    }
    
    if (element.children) {
      return element.children.map((child: any) => this.extractElementText(child)).join('');
    }
    
    return '';
  }

  private buildToc(items: TocItem[] = []): string {
    if (items.length === 0) return '';

    let html = '<div class="toc">';
    html += this.buildNestedList([...items], 1);
    html += '</div>';

    return html;
  }

  private buildNestedList(items: TocItem[], level: number): string {
    let html = '<ul>';

    while (items.length > 0 && items[0].level === level) {
      const item = items.shift();
      if (item) {
        html += `<li><a href="#${item.anchor}">${item.text}</a>`;
        
        // Check if next items are sub-items
        if (items.length > 0 && items[0].level > level) {
          html += this.buildNestedList(items, level + 1);
        }
        
        html += '</li>';
      }
    }

    return html + '</ul>';
  }

  async process(markdown: string, options: MarkdownProcessorOptions = {}): Promise<MarkdownResult> {
    const {
      toc = true,
      codeHighlighting = true
    } = options;

    // Reset TOC items for each processing
    this.tocItems = [];

    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm) // GitHub Flavored Markdown (includes footnotes, task lists, tables, etc.)
      .use(remarkFrontmatter, ['yaml', 'toml']);

    processor
      .use(this.extractHeadings)
      .use(remarkRehype, { allowDangerousHtml: false });

    if (codeHighlighting) {
      processor.use(rehypeHighlight);
    }

    processor
      .use(this.addHeadingAnchors)
      .use(rehypeStringify);

    const result = await processor.process(markdown);
    let html = String(result);

    // Replace TOC placeholder with generated TOC
    if (toc && this.tocItems.length > 0) {
      const tocHtml = this.buildToc(this.tocItems);
      html = html.replace(/\[\[\[TOC\]\]\]/g, tocHtml);
    }

    // Extract title from first heading
    const title = this.tocItems.length > 0 ? this.tocItems[0].text : '';

    return {
      title,
      html,
      toc: this.tocItems,
      frontmatter: result.data.frontmatter as Record<string, any>
    };
  }
}

// Create a singleton instance for backward compatibility
export function createModernParser() {
  const processor = new ModernMarkdownProcessor();
  
  return (markdown: string, options: { toc?: boolean } = {}) => {
    return processor.process(markdown, options);
  };
}

// Export the processor class for advanced usage
export { ModernMarkdownProcessor as MarkdownProcessor };
