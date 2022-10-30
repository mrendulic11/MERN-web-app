import React from 'react'
import {Form, Button} from 'react-bootstrap'

	
const LoginForma = ({
    userLogin,
    promjenaImena,
    promjenaLozinke,
    username,
    pass
  }) => (
    <Form onSubmit={userLogin}>
      <h2>Prijava korisnika:</h2>
      <Form.Group>
        <div style={{padding: 5}}>
        <Form.Label>Korisničko ime:</Form.Label>
        <Form.Control type="text" value={username} name="username" onChange={promjenaImena}/>
        <Form.Label>Lozinka:</Form.Label>
        <Form.Control type="password" value={pass} name='Pass' onChange={promjenaLozinke}/>
        <div style={{paddingTop: 10}}>
        <Button variant="primary" type="submit">Prijava</Button>
        </div>
        </div>
      </Form.Group>
    </Form>
  )

export default LoginForma