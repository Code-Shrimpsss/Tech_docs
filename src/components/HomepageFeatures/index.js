import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
	{
		title: '技术拓展',
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: <>记录前端技术脉动与进展，传播前端技术最佳实践。</>,
	},
	{
		title: '知识体系',
		Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
		description: (
			<>
				探索 JavaScript、前端框架、前端工程化、性能优化
				等前端技术的无限可能。
			</>
		),
	},
	{
		title: '博客状态',
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: <>平时一周更新一篇博文，持续更新面试题与原生手写案例。</>,
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
