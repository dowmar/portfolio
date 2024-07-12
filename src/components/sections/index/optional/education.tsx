
// Section structure
import Section from '../../../structure/section';
import Container from '../../../structure/container';

// Section general blocks
import SectionTitle from '../../../blocks/section.title'

// Career scss
import career from '../../../../styles/scss/sections/index/career.module.scss'


export default function Education() {
    return (
        <Section classProp={`${career.section} borderBottom`}>
            <Container spacing={['verticalXXXLrg']}>
                <SectionTitle
                    title="Education"
                    preTitle="Formal"
                    subTitle="Bachelor's Degree in Information Technology from Gunadarma University"
                />
                <section className={career.area}>

                    <article className={career.company}>
                        <div className={career.companyContent}>
        <span className={career.companyHeader}>
            <h3>Gunadarma University</h3>
            <h5>Depok, West Java</h5>
        </span>
                            <p>I have finished Bachelor&apos;s Degree in Information Technology from Gunadarma University with 3.68 GPA</p>

                        </div>
                        <div className={career.companyAlt}></div>
                    </article>

                </section>
            </Container>
        </Section>
    )
}

