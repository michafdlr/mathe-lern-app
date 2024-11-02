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
      const parts = text.split(/(\$[^\$]+\$)/g);
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
    return (
      <div className="prose prose-sm max-w-none">
        {parse(content, options)}
      </div>
    );
  } catch (error) {
    console.error('Content parsing error:', error);
    return <div>Error rendering content</div>;
  }
}
