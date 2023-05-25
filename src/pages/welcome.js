import React from 'react';
import Layout from '@theme/Layout';

export default function Hello() {
	return (
		<Layout title="Hello" description="Hello React Page">
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '50vh',
					fontSize: '20px',
					padding: '20vw',
				}}
			>
				Welcome, code boy who loves coding and is curious about new
				technologies 💻 <br />
				欢迎你，热爱编程且对新技术充满好奇心的码仔 💻 <br />
				This site mainly provides front-end knowledge output, front-end
				interview questions, business thinking and technical knowledge
				in the Web3 field. I usually record some thoughts that are not
				limited to technology, I hope it can help you! <br />
				本站点主要提供前端知识输出、前端面试题、业务场景以及 Web3
				领域的技术知识。平时也会记录一些不局限于前端技术的思考，本质上脱离不开技术的范畴，希望能帮到你！
				<br />
				If you are interested in more handwritten question source code,
				you can go to
				<a href="https://github.com/Code-Shrimpsss/Front-Dowork-Code">
					Github Code Library
				</a>
				if it is helpful to you, don't be stingy with your Star ⭐ oh~{' '}
				<br />
				如果对更多手写题源码感兴趣的话，可以前往 [Github
				代码库](https://github.com/Code-Shrimpsss/Front-Dowork-Code)，
				如果对你有帮助的话，不要吝啬你的 Star⭐ 哦~ <br />
			</div>
		</Layout>
	);
}
