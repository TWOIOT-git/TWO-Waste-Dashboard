import React from 'react'
import BoxBackground from '../BoxBackground'
import styles from './styles.module.css'
import SubTitle from '../SubTitle';
import AnalizeLink from '../AnalizeLink';

const AverageTime = ({ data, paragraph }) => {
    return (
        <BoxBackground wrapperProps={{ style: { height: '100%' } }}>
            <AnalizeLink />
            <div>
                <div className={styles.Wrapper}>
                    <SubTitle>{paragraph}</SubTitle>
                    <h4 className={styles.DataParagraph}>{data}</h4>
                </div>
            </div>
        </BoxBackground>
    )
}


export default AverageTime