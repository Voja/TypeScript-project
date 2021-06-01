import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Grid, Table } from 'semantic-ui-react'
import PrijavaModal from '../components/PrijavaModal'
import SeminarskiTabela from '../components/SeminarskiTabela'
import { Seminarski } from '../model'
import { SERVER_URL } from '../util'


interface Props {
    seminarski: Seminarski[]
}

export default function ObavezePage(props: Props) {

    const [selSeminarski, setSelSeminarski] = useState<Seminarski | undefined>(undefined)
    const [open, setOpen] = useState(false)

    const close = () => { setOpen(false) }

    const onRowClick = (sem: Seminarski) => {
        setSelSeminarski(prev => {
            if (prev === sem) {
                return undefined;
            }
            return sem;
        })
    }
    const kreirajPrijavu = async (data: FormData) => {
        const res = await axios.post(SERVER_URL + '/prijava', data);
    }
    return (
        <Grid padded>
            <PrijavaModal open={(selSeminarski && open) || false} close={close} onSubmit={kreirajPrijavu} seminarskiId={selSeminarski?.id} />
            <Grid.Row columns='16'>
                <Grid.Column textAlign='center' width='13'>
                    <h2>Obaveze</h2>
                </Grid.Column>
                {
                    selSeminarski && (
                        <Grid.Column width='2'>
                            <Button fluid primary onClick={() => {
                                setOpen(true);
                            }} >Prijavi</Button>
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
