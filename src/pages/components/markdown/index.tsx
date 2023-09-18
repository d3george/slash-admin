import { Row, Col, Card } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

import Markdown from '@/components/markdown';

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

![cover](https://res.cloudinary.com/trinhmai/image/upload/v1660897321/_minimal_mock/_Cover/cover_19.jpg)

> A block quote with ~~strikethrough~~ and a URL: [https://reactjs.org](https://reactjs.org).

`;

export default function MarkdownPage() {
  const [content, setContent] = useState(TEXT);
  return (
    <Row justify="space-between" gutter={20}>
      <Col xl={24} xxl={12}>
        <Card title="Content">
          <TextArea
            value={content}
            rows={40}
            onChange={(e) => setContent(e.currentTarget.value)}
            className="w-full !outline-none"
          />
        </Card>
      </Col>
      <Col xl={24} xxl={12} className="xl:mt-4 2xl:mt-0">
        <Card title="Mardown content">
          <Markdown>{content}</Markdown>
        </Card>
      </Col>
    </Row>
  );
}
