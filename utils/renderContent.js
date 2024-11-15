// renderContent.js
import React from 'react';
import parse from 'html-react-parser';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function renderContent(content) {
  if (!content) return null;

  function processLatex(text) {
    if (!text) return null;

    try {
      let processedText = text;
      const envPattern = /\\begin\{(pmatrix|cases|array|matrix|bmatrix|vmatrix)\}(.*?)\\end\{\1\}/gs;

      processedText = processedText.replace(envPattern, (match, env, content) => {
        // Process content inside environment
        const processedContent = content
          .replace(/\\/g, '\\\\') // Double backslashes
          .replace(/\\\\\s*\\/g, '\\') // Fix over-escaped commands
          .replace(/\s*\\\\\s*/g, ' \\\\ '); // Fix line breaks

        return `\\begin{${env}}${processedContent}\\end{${env}}`;
      });
      processedText = processedText.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');
      const parts = processedText.split(/(\$[^\$]+\$)/g);
      return parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const latex = part.slice(1, -1).trim();
          return (
            <span key={index}>
              <InlineMath math={latex} errorColor={'#cc0000'} />
            </span>
          );
        }
        return part;
      });
    } catch (error) {
      console.error('LaTeX processing error:', error);
      return text;
    }
  }

  function createReactElement(node) {
    if (!node) return null;

    // Handle text nodes
    if (node.type === 'text') {
      return node.data?.includes('$') ? processLatex(node.data) : node.data;
    }

    // Handle <i> tags specifically
    if (node.type === 'tag' && node.name === 'i') {
      const latexContent = node.children.map(child => {
        if (child.type === 'tag' && child.name === 'sub') {
          return `_{${child.children.map(grandchild => grandchild.data).join('')}}`;
        }
        if (child.type === 'tag' && child.name === 'sup') {
          return `^{${child.children.map(grandchild => grandchild.data).join('')}}`;
        }
        if (child.type === 'text') {
          let text = child.data;

          // Simple replacement of √(...) with \sqrt{...}
          text = text.replace(/√\(([^)]+)\)/g, '\\sqrt{$1}');

          return text;
        }
        return child.data;
      }).join('');

      return (
        <InlineMath key={Math.random().toString(36).substring(2, 9)} math={`${latexContent}`} />
      );
    }

    if (node.type === 'tag' && node.name === 'img') {
      const [isBroken, setIsBroken] = useState(false);

      const props = {
        ...node.attribs,
        key: Math.random().toString(36).substring(2, 9),
        alt: node.attribs.alt || '',
        onError: () => setIsBroken(true),
      };

      return !isBroken ? <img {...props} /> : null;
    }

    // Handle element nodes
    if (node.type === 'tag') {
      const props = {
        ...node.attribs,
        key: Math.random().toString(36).substring(2, 9)
      };

      const children = node.children?.map(child => createReactElement(child));
      return React.createElement(node.name, props, children);
    }

    return null;
  }

  const options = {
    replace: (node) => {
      try {
        // Process text nodes with LaTeX
        if (node.type === 'text' && node.data?.includes('$')) {
          return processLatex(node.data);
        }

        // Convert HTML elements to React elements
        if (node.type === 'tag') {
          return createReactElement(node);
        }

        return undefined;
      } catch (error) {
        console.error('Node processing error:', error);
        return null;
      }
    }
  };

  try {
    const wrappedContent = `<div>${content}</div>`;
    return (
      <div className="prose prose-sm max-w-none">
        {parse(wrappedContent, options)}
      </div>
    );
  } catch (error) {
    console.error('Content parsing error:', error);
    return <div>Error rendering content</div>;
  }
}
