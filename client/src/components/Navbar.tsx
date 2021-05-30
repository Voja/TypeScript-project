
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Menu, Segment } from 'semantic-ui-react'
import { isStudent, Profesor, Student } from '../model'
interface Props {
    user: Student | Profesor | undefined
    full?: boolean,
}
export default function Navbar(props: Props) {
    if (!props.user) {
        return (
            <Header textAlign='center'>
                <h1>Aplikacija za evidentiranje seminarskih radova studenata FON - a </h1>

            </Header>
        )
    }
    return (

        <Menu borderless color='grey' fluid>
            <Menu.Item header >
                {props.user.ime + ' ' + props.user.prezime}
            </Menu.Item>
            <Menu.Item as={Link} to='/' >
                Ispiti
            </Menu.Item>
            {
                isStudent(props.user) ? (
                    <>


                        <Menu.Item as={Link} to='/obaveze' >
                            Obaveze
                        </Menu.Item>
                        <Menu.Item as={Link} to='/predato' >
                            Predati radovi
                        </Menu.Item>

                    </>
                ) : (
                    <>
                        <Menu.Item>
                            Predati seminarski radovi
                        </Menu.Item>
                    </>
                )
            }
            <Menu.Menu position='right'>
                <Menu.Item >
                    <Button>Logout</Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>

    )
}