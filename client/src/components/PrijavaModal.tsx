import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'semantic-ui-react'
import { Prijava, Profesor } from '../model'
import { SERVER_URL, setFormState } from '../util'

interface Props {
    prijava?: Prijava,
    onSubmit?: (pr: Partial<Prijava>) => void,
    open: boolean,
    close: () => void,
    seminarskiId?: number

}

export default function PrijavaModal(props: Props) {

    const [profesori, setProfesori] = useState<Profesor[]>([])
    const [nazivTeme, setNazivTeme] = useState('');
    const [selProf, setSelProf] = useState<Profesor | undefined>(undefined)
    useEffect(() => {
        axios.get(SERVER_URL + '/profesor').then(res => {
            setProfesori(res.data);
        })
    }, [])

    return (
        <Modal open={props.open} onClose={props.close}>
            <Modal.Header>
                Prijava
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Input value={nazivTeme} onChange={setFormState(setNazivTeme)} required label='Naziv teme' />
                    <Form.Dropdown required selection label='Mentor' value={selProf?.id} options={profesori.filter(element => {
                        return element.predaje.reduce((prev: boolean, val) => {
                            return prev || (val.seminarski.find(sem => sem.id === props.seminarskiId) !== undefined);
                        }, false)
                    }
                    ).map(element => {
                        return {
                            text: element.ime + ' ' + element.prezime,
                            value: element.id,
                            onClick: () => { setSelProf(element) }
                        }
                    })} />
                    <Form.Input required type='file' label='Fajl' />
                    <Form.Button>Prijavi</Form.Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
