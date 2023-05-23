# LOG

/blog/ - 包含博客的 Markdown 文件。如果你关闭了博客功能，则可以将此目录删除。你还可以通过设置 path 参数来改变此目录的名称。在 博客功能指南 文档中可以找到更多详细信息
/docs/ - 包含文档的 Markdown 文件。可在 sidebars.js 中自定义文档在侧边栏中的顺序。如果你关闭了文档功能，则可以删除该目录。你还可以通过设置 path 参数来改变此目录的名称。在 文档功能指南 中可以找到更多详细信息
/src/ - 非文档文件，例如独立页面（pages）或自定义的 React 组件。你不必严格地遵守将非文档文件放到这里，但是将它们集中在此目录下可以更轻松地进行管理，以便您需要进行某些格式校验或处理
/src/pages - 此目录中的任何扩展名为 JSX/TSX/MDX 文件都将被转换为网站的独立页面(page)。 可以在 独立页面（pages）指南 中找到更多详细信息
/static/ - 存放静态文件的目录。此处的所有内容都将被复制到最终的 build 目录的根目录下
/docusaurus.config.js - 包含站点配置的配置文件。与 Docusaurus 1 中的 siteConfig.js 文件等价
/package.json - Docusaurus 网站也是一个 React 应用程序。你可以在其中安装和使用所需的任何 npm 软件包
/sidebars.js - 生成文档时使用此文件来指定侧边栏中的文档顺序

## TODO

-   默认 Dark mode 👍
-   i18n
