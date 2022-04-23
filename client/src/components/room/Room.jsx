import React from 'react';
import Input from "../../utils/input/Input"
import './room.css';
import '../style.css';

const Room = () => {
    // Достать надобно ID конференции никем не занятый

    return (
        <div className="room"> 

            <div>
            Создать конференцию
            <div className="room__create_conference_container styled_container">
                <Input className='text' type="text" placeholder="ID Конференции"/>
                <Input className='text' type="password" placeholder="Пароль"/>
                <button className="button">Создать конференцию</button>
            </div>
            </div>
            <div>
            Подключиться к конференции
            <div className="room__connect_conference_container styled_container">
                <Input className='text' type="text" placeholder="ID Конференции"/>
                <Input className='text' type="password" placeholder="Пароль"/>
                <button className="button">Подключиться к конференции</button>
            </div>
            </div>
        </div>
    )
}

export default Room;