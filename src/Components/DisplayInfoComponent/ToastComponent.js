import React, { useState } from 'react'
import { Toast } from 'react-bootstrap';

export default function ToastComponent({pokemonName, showA, toggleShowA}) {
    return (
        <div>
            <Toast show={showA} onClose={toggleShowA} delay={3000} autohide className='favToast d-flex align-items-center justify-content-center'>
                <Toast.Body>{`${pokemonName} was added to favorites!`}</Toast.Body>
            </Toast>
        </div>
    )
}
