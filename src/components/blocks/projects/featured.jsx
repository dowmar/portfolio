
import Image from 'next/image'
import { useEffect } from 'react'
import { m, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

import Badges from '../../utils/badge.list'
import Icon from '../../utils/icon'

import css from '../../../styles/scss/sections/projects/featured.module.scss'

export default function FeaturedProject({ content, index }) {
	const { project, url, repo, descriptionTitle, description, stack, images } = content
	const previewImage = images?.[0]

	const controls = useAnimation();
	const { ref, inView  } = useInView({
		"threshold": 0.25,
		"triggerOnce": false
	})

	useEffect( () => {
		if ( inView ) {	controls.start("visible") }
		if ( !inView ) { controls.start("hidden") }
	}, [ controls, inView ] )

	const handleProjectClick = () => {
		window.open(url, '_blank', 'noopener,noreferrer');
	};

	return (
		<m.section 	
			key={index}
			className={css.project}
			//framer-motion
			ref={ref}
			variants={container}
			initial={[ "rest", "hidden" ]}
			whileHover="hover"
			animate={controls}
		>
			<div className={css.imageContainer} onClick={handleProjectClick}>
				{previewImage ? (
					<>
						<div className={css.imageGlow} aria-hidden="true" />
						<m.div className={css.imageFrame} variants={imageFrame}>
							<Image
								src={previewImage.url}
								alt={`${project} preview`}
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className={css.projectImage}
								priority={index < 2}
							/>
						</m.div>
					</>
				) : null}
				<div className={css.imageOverlay}>
					<span className={css.projectIndex}>0{index + 1}</span>
					<div className={css.visualMeta}>
						<span>Live Project</span>
						<span>{stack.length} technologies</span>
					</div>
				</div>
			</div>

			<div className={css.details}>
				<div className={css.projectHeader}>
					<span className={css.eyebrow}>Selected Work</span>
					<div className={css.header}>
						<h3 className="highlight">{project}</h3>
						<span className={css.privateOr}>
							<i className="devicon-github-plain"></i>
							{repo}
						</span>
					</div>
					<div className={css.description}>
						<p>{descriptionTitle}</p>
						<span>{description}</span>
					</div>
					<div className={css.stackContainer}>
						<Badges list={stack} block="stack" fullContainer={false} color={false} />
					</div>
					<div className={css.actionRow}>
						<m.button type="button" variants={buttonMotion} className={css.viewProject} onClick={handleProjectClick}>
							<span>Open project</span>
							<Icon icon={[ 'fad', 'arrow-right-to-bracket' ]} />
						</m.button>
						<span className={css.projectHint}>Fast read, cleaner preview, no tiny screenshot chaos.</span>
					</div>
				</div>
			</div>
		</m.section>
	)
}

const container = {
	hidden: { 
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.0625
		}
	},
	visible: {
		transition: {
			delayChildren: 0.125,
			staggerChildren: 0.25,
		}
	},
	rest: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	},
	hover: {
		transition: {
			delayChildren: 0,
			staggerChildren: 0,
		}
	}
}

const imageFrame = {
	hidden: {
		y: 50,
		opacity: 0,
		scale: 0.96,
	},
	visible: {
		y: 0,
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.55,
			ease: 'easeOut',
		},
	},
	rest: {
		scale: 1,
		rotate: 0,
	},
	hover: {
		scale: 1.02,
		rotate: -1,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
}

const buttonMotion = {
	rest: {
		x: 0,
	},
	hover: {
		x: 4,
		transition: {
			duration: 0.2,
			ease: 'easeOut',
		},
	},
}

