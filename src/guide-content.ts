export const GUIDE_CONTENT = `# flrbin Guide: Mastering Your Markdown Pastes

Welcome to the \`flrbin\` guide! \`flrbin\` is a powerful and flexible [Markdown](https://en.wikipedia.org/wiki/Markdown) pastebin, designed for simplicity and efficiency. Heavily inspired by [rentry.co](https://rentry.co), 

\`flrbin\` distinguishes itself as a [free and open-source](https://github.com/kvnlabs/flrbin) solution that is easily self-hostable.

Leveraging modern Markdown processing with **GitHub Flavored Markdown (GFM)** support, \`flrbin\` supports a comprehensive set of Markdown features including tables, task lists, math equations, and syntax highlighting, allowing you to format your text with ease and precision.

This guide provides an in-depth overview of Markdown syntax supported by \`flrbin\`, adapted with modifications from [learnxinyminutes](https://learnxinyminutes.com/docs/markdown/). 
Whether you're a seasoned Markdown user or just starting, this guide will help you create well-structured and visually appealing pastes.

[[[TOC]]]


## 🔗 Custom URLs

When creating a new paste, you have the option to specify a custom URL for easy access and sharing.
*   **Maximum Length:** URLs are limited to a maximum of 40 characters.
*   **Reserved URLs:** The URL \`guide\` is reserved for this documentation.
*   **Automatic Generation:** If no custom URL is provided, a unique URL will be automatically generated for your paste.

## 🛡️ Edit Codes

To control access and modifications to your paste, you can set a custom edit code.

*   **Protection:** Providing an edit code safeguards your paste from unauthorized edits and deletions.
*   **Public Access:** If an edit code is not provided, your paste can be edited or deleted by anyone with access to the URL.

## 🔒 Client-Side Encryption

\`flrbin\` now supports **client-side encryption** for sensitive content. Your data is encrypted in your browser before being sent to the server, ensuring maximum privacy.

### How It Works

*   **Strong Encryption:** Uses ChaCha20-Poly1305 encryption with PBKDF2 key derivation
*   **Password-Based:** You set a password that's never sent to the server
*   **Secure:** Even server administrators cannot read your encrypted content
*   **Recovery:** ⚠️ **If you lose the password, the paste cannot be recovered**

### Using Encryption

1. When creating a paste, check the "🔒 Encrypt this paste with a password" option
2. Enter a strong password (minimum 8 characters)
3. Optionally use the 🎲 button to generate a secure password
4. Save your paste - it will be encrypted before submission
5. Share the paste URL and password separately for maximum security

### Decrypting Pastes

When viewing an encrypted paste:
1. A decryption prompt will appear automatically
2. Enter the correct password
3. The content will be decrypted in your browser
4. Edit the decrypted content normally

## ✨ Enhanced Editor Features

The editor now includes powerful features to enhance your writing experience:

### Keyboard Shortcuts

*   **Ctrl+B** - Bold selected text (\`**bold**\`)
*   **Ctrl+I** - Italic selected text (\`*italic*\`)
*   **Ctrl+K** - Insert link (\`[text](url)\`)
*   **Ctrl+Shift+C** - Inline code (\`\\\`code\\\`\`)
*   **Ctrl+Shift+L** - Insert list item (\`- item\`)
*   **Ctrl+Shift+T** - Insert table template
*   **Ctrl+Shift+M** - Insert math block (\`$$..$$\`)

### Toolbar

Use the visual toolbar above the editor for quick formatting:
*   **Bold**, **Italic**, **Code** formatting
*   🔗 **Link** insertion
*   • **List** creation
*   📊 **Table** templates
*   ∑ **Math** equation blocks
*   **# Headings** and **❝ Quotes**

### Live Preview

*   Switch to the **Preview** tab to see your rendered Markdown
*   Real-time updates as you type
*   Full support for all new features including math and tables

## 🌐 HTML Elements

Markdown is designed to be easily readable and writable, but it also allows for the seamless integration of raw HTML. This means any valid HTML can be embedded directly into your Markdown document.

\`\`\`md
<!--
  You can use standard HTML elements within your Markdown.
  However, be aware that Markdown syntax will not be processed
  inside raw HTML blocks. For example, \`*bold*\` will not render as bold
  if it's inside a \`<div>\` tag.
-->
<div>
  This is a <em>mix</em> of HTML and Markdown.
  Markdown **will not** be processed here.
</div>
\`\`\`

**Important Considerations:**
*   **Sanitization:** \`flrbin\` automatically sanitizes untrusted HTML to prevent security vulnerabilities. This ensures that embedded HTML is safe for viewing.
*   **Markdown within HTML:** Markdown syntax is generally not parsed within raw HTML blocks. If you need Markdown formatting, ensure it's outside the HTML tags.

## 📝 Headings

Headings are crucial for structuring your content and improving readability. Markdown supports six levels of headings, from \`<h1>\` (the most important) to \`<h6>\` (the least important).

### Hash-style Headings

Use one to six hash symbols (\`#\`) at the beginning of a line, corresponding to the heading level. The number of hashes determines the heading level.

\`\`\`md
# This is an H1 heading
## This is an H2 heading
### This is an H3 heading
#### This is an H4 heading
##### This is an H5 heading
###### This is an H6 heading
\`\`\`

### Setext-style Headings

For \`<h1>\` and \`<h2>\` only, you can use an underline of equals signs (\`=\`) for \`<h1>\` or hyphens (\`-\`) for \`<h2>\` on the line immediately following the heading text. The number of characters in the underline doesn't matter, as long as there's at least one.

\`\`\`md
This is an H1 heading
=====================

This is an H2 heading
---------------------
\`\`\`

**Best Practices for Headings:**
*   Use headings to create a logical hierarchy for your content.
*   Start with \`<h1>\` for the main title and proceed with \`<h2>\`, \`<h3>\`, etc., for sub-sections.
*   Avoid skipping heading levels (e.g., going directly from \`<h2>\` to \`<h4>\`).
*   Keep heading text concise and descriptive.

## ✨ Simple Text Styles

Markdown provides straightforward ways to apply common text styles like italics, bold, and strikethrough.

### Italics

To render text in *italics*, enclose it with either single asterisks (\`*\`) or single underscores (\`_\`).

\`\`\`md
*This text is in italics.*
_And so is this text._
\`\`\`

### Bold

To make text **bold**, use double asterisks (\`**\`) or double underscores (\`__\`).

\`\`\`md
**This text is in bold.**
__And so is this text.__
\`\`\`

### Bold and Italics

Combine three asterisks (\`***\`) or three underscores (\`___\`) to apply both **_bold and italics_**.

\`\`\`md
***This text is in both.***
**_As is this!_**
*__And this!__*
\`\`\`

### Strikethrough

To apply ~~strikethrough~~ to text, enclose it with two tildes (\`~~\`).

\`\`\`md
~~This text is rendered with strikethrough.~~
\`\`\`

**Best Practices for Text Styles:**
*   Use text styles sparingly to emphasize key information, not for general formatting.
*   Be consistent with your choice of delimiters (e.g., always use \`*\` for italics, or always \`_\`).
*   Avoid over-styling, as it can make your content harder to read.

## 📄 Paragraphs

Paragraphs are fundamental blocks of text in Markdown. A paragraph is simply one or more consecutive lines of text, separated by one or more blank lines.

\`\`\`md
This is the first paragraph. It can span multiple lines,
and as long as there's no blank line in between, it's considered part of the same paragraph.

This is the second paragraph. A single blank line separates it from the previous one.


This is the third paragraph. Multiple blank lines have the same effect as a single blank line in separating paragraphs.
\`\`\`

**Best Practices for Paragraphs:**
*   Use blank lines to clearly delineate paragraphs, improving readability.
*   Keep paragraphs focused on a single idea or topic.
*   Avoid excessively long paragraphs, which can be difficult to read on screens.

## 💬 Blockquotes

Blockquotes are used to highlight quoted text, often from an external source or for emphasis. They are indicated by a \`>\` character at the beginning of each line of the quoted text.

\`\`\`md
> This is a blockquote. You can either manually wrap your lines and put a \`>\` before every line, or you can let your lines extend naturally. Markdown will handle the wrapping for you, as long as each line of the blockquote starts with a \`>\`.
> It's a great way to set apart important information or citations.
\`\`\`

### Nested Blockquotes

You can also nest blockquotes by adding additional \`>\` characters.

\`\`\`md
> This is the first level of a blockquote.
>> This is a nested blockquote, providing a second level of indentation.
> Back to the first level.
\`\`\`

**Best Practices for Blockquotes:**
*   Use blockquotes for actual quotations or to visually separate distinct pieces of information.
*   Ensure proper attribution for quoted material.
*   Avoid using blockquotes for general indentation, as it can confuse readers.

## 📋 Lists

Markdown supports both unordered (bulleted) and ordered (numbered) lists, which are essential for organizing information clearly and concisely.

### Unordered Lists

Unordered lists can be created using asterisks (\`*\`), hyphens (\`-\`), or plus signs (\`+\`) as list markers. Consistency within a single list is recommended for better readability.

\`\`\`md
* Item one
* Item two
  * Nested item A
  * Nested item B
* Item three

- Another item one
- Another item two

+ Yet another item one
+ Yet another item two
\`\`\`

### Ordered Lists

Ordered lists are created by starting each line with a number followed by a period (\`.\`). The actual numbers you use don't matter for the rendered output; Markdown will automatically number them correctly. However, it's a good practice to start with \`1.\` for the first item.

\`\`\`md
1. First item
2. Second item
3. Third item
   1. Nested ordered item
   2. Another nested ordered item
4. Fourth item

1. Even if you use the same number,
1. Markdown will render it correctly.
1. This can be useful for reordering items easily.
\`\`\`

### Mixing List Types

You can mix unordered and ordered lists, and nest them to create complex structures.

\`\`\`md
1. Main ordered item
   * Unordered sub-item A
   * Unordered sub-item B
2. Second main ordered item
   1. Ordered sub-item 1
   2. Ordered sub-item 2
\`\`\`

**Best Practices for Lists:**
*   Use lists to break down complex information into digestible points.
*   Ensure proper indentation for nested list items (typically 2 or 4 spaces).
*   Be consistent with your chosen list marker for unordered lists.
*   For ordered lists, starting with \`1.\` is a common convention, even though Markdown adjusts numbering automatically.

## ✅ Task Lists

Task lists (also known as checklists) are a useful extension of Markdown lists, allowing you to create interactive checkboxes within your documents. They are particularly helpful for tracking progress or outlining to-do items.

To create a task list, use a hyphen (\`-\`), asterisk (\`*\`), or plus sign (\`+\`) followed by a space, then square brackets (\`[]\`). Inside the brackets, an \`x\` (case-insensitive) indicates a checked item, while an empty space indicates an unchecked item.

\`\`\`md
- [ ] First task to complete (unchecked).
- [ ] Second task that needs done (unchecked).
- [x] This task has been completed (checked).
* [X] Another completed task (case-insensitive 'x').
\`\`\`

When rendered, these will typically appear as HTML checkboxes that can be toggled.

**Best Practices for Task Lists:**
*   Use task lists for actionable items or to represent states (e.g., done/not done).
*   Ensure consistent formatting for clarity.
*   Remember that the interactivity (toggling checkboxes) is usually a feature of the Markdown renderer, not the raw Markdown itself.

## 💻 Code Blocks

Code blocks are essential for displaying source code or pre-formatted text. Markdown supports two primary ways to create code blocks: inline code and fenced code blocks.

### Inline Code

For short snippets of code within a line of text, use single backticks (\`\\\`\`).

\`\`\`md
Use the \`console.log()\` function to debug.
\`\`\`

### Fenced Code Blocks

For larger blocks of code, use fenced code blocks. These are created by placing three or more backticks (\`\\\`\\\`\\\`\`) or tildes (\`~~~\`) on the lines before and after the code block. This method is preferred as it allows for syntax highlighting.

\`\`\`md
\\\`\\\`\\\`ruby
  def foobar
      puts "Hello world!"
  end
\\\`\\\`\\\`

\\\`\\\`\\\`javascript
function greet(name) {
  return \\\`Hello, \${name}!\\\`
}
\\\`\\\`\\\`
\`\`\`

**Syntax Highlighting:**

You can specify the programming language immediately after the opening fence (e.g., \`\\\`\\\`\\\`ruby\`). This enables syntax highlighting, making the code more readable and visually distinct.

**Best Practices for Code Blocks:**
*   Use inline code for short code snippets within sentences.
*   Always use fenced code blocks for multi-line code examples.
*   Specify the language for fenced code blocks to enable proper syntax highlighting.
*   Ensure your code examples are correct and easy to understand.

## 📐 Math Equations

\`flrbin\` now supports mathematical expressions using **KaTeX**, allowing you to render beautiful mathematical notation in your pastes. This is perfect for academic content, scientific documentation, or any content that requires mathematical expressions.

### Inline Math

For mathematical expressions within a paragraph, use single dollar signs (\`$\`):

\`\`\`md
The quadratic formula is $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.

Einstein's famous equation is $E = mc^2$.
\`\`\`

### Display Math

For larger mathematical expressions that should be displayed on their own line and centered, use double dollar signs (\`$$\`):

\`\`\`md
$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

$$
\\begin{bmatrix}
a & b \\\\
c & d
\\end{bmatrix}
\\begin{bmatrix}
x \\\\
y
\\end{bmatrix}
=
\\begin{bmatrix}
ax + by \\\\
cx + dy
\\end{bmatrix}
$$
\`\`\`

### Common Mathematical Notation

Here are some examples of mathematical notation you can use:

**Greek Letters:**
\`\`\`md
$\\alpha$, $\\beta$, $\\gamma$, $\\Gamma$, $\\pi$, $\\Pi$, $\\phi$, $\\varphi$, $\\mu$, $\\Phi$
\`\`\`

**Fractions and Roots:**
\`\`\`md
$\\frac{1}{2}$, $\\frac{x+1}{x-1}$, $\\sqrt{x}$, $\\sqrt[3]{x}$, $\\sqrt[n]{x}$
\`\`\`

**Superscripts and Subscripts:**
\`\`\`md
$x^2$, $x^{n+1}$, $x_1$, $x_{i,j}$, $a_n^2$
\`\`\`

**Sums and Integrals:**
\`\`\`md
$\\sum_{i=1}^{n} x_i$, $\\int_0^1 f(x) dx$, $\\prod_{i=1}^{n} x_i$
\`\`\`

**Set Notation:**
\`\`\`md
$\\{1, 2, 3\\}$, $x \\in S$, $A \\cup B$, $A \\cap B$, $A \\subset B$
\`\`\`

**Logic and Relations:**
\`\`\`md
$\\forall x$, $\\exists y$, $\\neg p$, $p \\land q$, $p \\lor q$, $p \\implies q$
\`\`\`

**Best Practices for Math:**
*   Use inline math (\`$...$\`) for simple expressions within text
*   Use display math (\`$$...$$\`) for complex equations that need emphasis
*   Test your equations in the preview to ensure they render correctly
*   Reference the [KaTeX documentation](https://katex.org/docs/supported.html) for comprehensive syntax support

## ➖ Horizontal Rule

A horizontal rule (also known as a thematic break) is used to visually separate content sections within a document. It renders as a horizontal line across the page.

You can create a horizontal rule using three or more hyphens (\`---\`), asterisks (\`***\`), or underscores (\`___\`) on a line by themselves, with or without spaces between them.

\`\`\`md
***

---

- - -

****************
\`\`\`

**Best Practices for Horizontal Rules:**
*   Use horizontal rules sparingly to indicate a significant shift in topic or a new section.
*   Avoid using them purely for decorative purposes.
*   Ensure there are blank lines above and below the rule for proper rendering.

## 🔗 Links

Links are fundamental for connecting information within and outside your \`flrbin\` pastes. Markdown provides several ways to create hyperlinks.

### Inline Links

Inline links are the most common type. Enclose the link text in square brackets (\`[]\`) immediately followed by the URL in parentheses (\`()\`). An optional title, which appears as a tooltip on hover, can be added in quotes after the URL.

\`\`\`md
[Click me!](http://test.com/)

[Click me!](http://test.com/ "Link to Test.com")
\`\`\`

### Relative Paths

You can also use relative paths for links within the same project or website, which is useful for navigation between \`flrbin\` pastes or other internal resources.

\`\`\`md
Relative paths work too:
[Go to music](/music/).
\`\`\`

### Reference-style Links

Reference-style links allow you to define your URLs separately from the link text, which can improve readability for documents with many links or repeated links. The link definition can be placed anywhere in the document.

\`\`\`md
[Click this link][link1] for more info about it!
[Also check out this link][foobar] if you want to.

[link1]: http://test.com/ "Cool!"
[foobar]: http://foobar.biz/ "Alright!"
\`\`\`

**Best Practices for Links:**
*   Use descriptive link text that clearly indicates where the link leads.
*   Ensure URLs are correct and accessible.
*   Consider using reference-style links for cleaner Markdown in complex documents.
*   For external links, it's often good practice to inform the user that they will be leaving the current site (though this is typically handled by the rendering application).

## 📑 Table of Contents

A Table of Contents (TOC) greatly enhances the navigability of longer Markdown documents, allowing readers to quickly jump to relevant sections.

### Manual Table of Contents

You can manually create a table of contents by linking to your headings. Markdown automatically generates anchors for headings, typically by converting the heading text to lowercase and replacing spaces with hyphens.

\`\`\`md
- [Heading](#heading)
- [Another heading](#another-heading)
- [Chapter](#chapter)
  - [Subchapter](#subchapter)
\`\`\`

### Automatic Table of Contents

\`flrbin\` offers a convenient way to automatically generate a table of contents using the \`[ [[TOC]]]\` <- (remove the space) token. This feature dynamically creates a TOC based on all headings in your document, simplifying the process for you.

For example, by simply typing this:

\`\`\`md
Here is the table of contents:

[[[TOC]]]
\`\`\`

\`flrbin\` will automatically generate a comprehensive table of contents containing all headings found within your document.

**Best Practices for Table of Contents:**
*   Place the TOC near the beginning of your document for easy access.
*   For very long documents, an automatic TOC is highly recommended.
*   Ensure your headings are clear and descriptive, as they will form the entries in your TOC.

## 🖼️ Images

Images are crucial for visual communication and can significantly enhance your Markdown documents. Markdown provides a straightforward syntax for embedding images.

To embed an image, use an exclamation mark (\`!\`) followed by the alt text in square brackets (\`[]\`), and then the image URL in parentheses (\`()\`). An optional title, which appears as a tooltip on hover, can be added in quotes after the URL.

\`\`\`md
![This is the alt-attribute for my image](http://imgur.com/myimage.jpg "An optional title")
\`\`\`

**Components of an Image Tag:**
*   **\`!\` (Exclamation Mark):** Indicates that the following is an image.
*   **\`[Alt Text]\`:** This is descriptive text that appears if the image cannot be displayed (e.g., due to a broken link or for screen readers). It's crucial for accessibility and SEO.
*   **\`(URL)\`:** The path or URL to the image file. This can be an absolute URL (e.g., \`http://example.com/image.png\`) or a relative path (e.g., \`/images/my-photo.jpg\`).
*   **\`"Optional Title"\`:** Text that appears as a tooltip when a user hovers over the image. This is optional but can provide additional context.

**Best Practices for Images:**
*   **Descriptive Alt Text:** Always provide meaningful alt text. This is vital for accessibility and helps search engines understand your content.
*   **Image Optimization:** For web-based content, use optimized images (appropriate file format, compressed size) to ensure fast loading times.
*   **Hosting:** Ensure your images are hosted on a reliable server or service.
*   **Copyright:** Always respect copyright laws when using images.

## 📊 Tables

Tables are an excellent way to present structured data in a clear and organized manner within your Markdown documents.

### Basic Table Structure

To create a table, use hyphens (\`-\`) to separate the header from the rest of the table, and pipes (\`|\`) to delineate columns. The number of hyphens in the separator line doesn't matter, as long as there's at least one for each column.

\`\`\`md
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1 Col 1 | Row 1 Col 2 | Row 1 Col 3 |
| Row 2 Col 1 | Row 2 Col 2 | Row 2 Col 3 |
\`\`\`

### Column Alignment

You can control the alignment of text within each column by adding colons (\`:\`) to the separator line:

*   **Left-aligned:** Place a colon on the left side (\`:---\`).
*   **Right-aligned:** Place a colon on the right side (\`---:\`).
*   **Centered:** Place colons on both sides (\`:---:\`).

\`\`\`md
| Left-aligned | Centered | Right-aligned |
| :----------- | :------: | ------------: |
| Data 1       | Data 2   | Data 3        |
| More Data    | More     | Even More     |
\`\`\`

### Minimal Table Syntax

While it's good practice to align your pipes for readability in the Markdown source, it's not strictly necessary. Markdown will render the table correctly even with minimal spacing.

\`\`\`md
Col 1|Col2|Col3
:--|:-:|--:
Ugh this is so ugly|make it|stop
\`\`\`

**Best Practices for Tables:**
*   **Simplicity:** Keep tables as simple as possible. For very complex data, consider linking to an external spreadsheet or database.
*   **Readability:** While not strictly required, aligning columns in your Markdown source makes it much easier to read and maintain.
*   **Headers:** Always include a header row to clearly label your data.
*   **Consistency:** Be consistent with your chosen alignment for similar data types.
*   **Content within Cells:** Avoid complex Markdown (like blockquotes or multiple paragraphs) within table cells, as rendering can be inconsistent across different Markdown processors.

This concludes the \`flrbin\` guide. We hope this comprehensive overview helps you create effective and well-structured Markdown pastes. Happy pasting!`;
