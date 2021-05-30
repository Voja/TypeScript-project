

import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import { Prijava } from '../model'
import { ucitajFajl } from '../util'

interface Props {
    prijave: Prijava[]
}
export default function PredatePrijaveTabela(props: Props) {
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv teme</Table.HeaderCell>
                    <Table.HeaderCell>Seminarski rad</Table.HeaderCell>
                    <Table.HeaderCell>Mentor</Table.HeaderCell>
                    <Table.HeaderCell>Rad</Table.HeaderCell>
                    <Table.HeaderCell>Ocena</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    props.prijave.map(element => {
                        return (
                            <Table.Row>
                                <Table.Cell>{element.nazivTeme}</Table.Cell>
                                <Table.Cell>{element.seminarski.naziv}</Table.Cell>
                                <Table.Cell>{element.mentor.ime + ' ' + element.mentor.prezime}</Table.Cell>
                                <Table.Cell link icon='file pdf outline' onClick={() => {
                                    ucitajFajl(element.fajl);
                                }}>
                                    Vidi fajl
                                        </Table.Cell>
                                <Table.Cell>{element.status === 'ocenjena' ? element.brojPoena : 'Nije ocenjen'}</Table.Cell>{
                                    element.status === 'kreirana' && (
                                        <Table.Cell >
                                            <Button>Izmeni</Button>
                                            <Button>Obrisi</Button>
                                        </Table.Cell>
                                    )
                                }
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        </Table>
    )
}
