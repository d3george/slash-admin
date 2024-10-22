import { Card, Typography } from 'antd';
import { useState } from 'react';

import Markdown from '@/components/markdown';
import { useThemeToken } from '@/theme/hooks';

const TEXT = `
# h1

<br/>

## h2

<br/>

**Paragraph** Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.

<br/>

[Link (https://www.google.com/)](https://www.google.com/)

<br/>

###### Lists

<br/>

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

<br/>

---

<br/>

###### A table:

<br/>

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

<br/>

\`\`\`tsx
import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

ReactDOM.render(
  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{'# Your markdown here'}</ReactMarkdown>,
  document.querySelector('#content')
);
\`\`\`

<br/>

> A block quote with ~~strikethrough~~ and a URL: [https://reactjs.org](https://reactjs.org).

`;

export default function MarkdownPage() {
  const [content] = useState(TEXT);
  const { colorPrimary } = useThemeToken();
  return (
    <>
      <Typography.Link
        href="https://github.com/remarkjs/react-markdown"
        style={{ color: colorPrimary }}
        className="mb-4 block"
      >
        https://github.com/remarkjs/react-markdown
      </Typography.Link>
      <Card title="Mardown content">
        <Markdown>{content}</Markdown>
      </Card>
    </>
  );
}
