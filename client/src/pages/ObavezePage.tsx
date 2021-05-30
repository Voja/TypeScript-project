import React, { useState } from 'react'
import { Button, Container, Grid, Table } from 'semantic-ui-react'
import SeminarskiTabela from '../components/SeminarskiTabela'
import { Seminarski } from '../model'


interface Props {
    seminarski: Seminarski[]
}

export default function ObavezePage(props: Props) {

    const [selSeminarski, setSelSeminarski] = useState<Seminarski | undefined>(undefined)

    const onRowClick = (sem: Seminarski) => {
        setSelSeminarski(prev => {
            if (prev === sem) {
                return undefined;
            }
            return sem;
        })
    }

    return (
        <Grid padded>
            <Grid.Row columns='16'>
                <Grid.Column textAlign='center' width='13'>
                    <h2>Obaveze</h2>
                </Grid.Column>
                {
                    selSeminarski && (
                        <Grid.Column width='2'>
                            <Button fluid primary>Prijavi</Button>
                        </Grid.Column>
                    )
                }
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width='16'>
                    <SeminarskiTabela active={selSeminarski} onRowClick={onRowClick} radovi={props.seminarski} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
