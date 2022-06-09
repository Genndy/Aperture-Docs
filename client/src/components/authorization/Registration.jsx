import React, {useState} from 'react';
import './authorization.css'
import '../style.css'
import Input from "../../utils/input/Input";
import {registration} from "../../actions/user";

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    return (
        <div className='styled_container authorization'>
            <div className="authorization__header">Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <Input value={name} setValue={setName} type="text" placeholder="Введите имя..."/>
            <Input value={surname} setValue={setSurname} type="text" placeholder="Введите фамилию..."/>
            <button className="authorization__btn" onClick={() => registration(email, password, name, surname)}>Зарегистрироваться</button>
        </div>
    );
};

export default Registration;
