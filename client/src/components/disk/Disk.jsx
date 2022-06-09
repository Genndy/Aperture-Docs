import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFiles, uploadFile, searchFiles} from "../../actions/file";
import Collapsible from '../custom/Collapsible';
import FileList from "./fileList/FileList";
import '../style.css'
import './disk.css'
import {showLoader} from "../../reducers/appReducer";
import Popup from "./Popup";
import {setCurrentDir, setFileView, setPopupDisplay} from "../../reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import {setPage} from "../../reducers/pageReducer"
import { setFilesToSide } from '../../reducers/sideReducer';

const Disk = () => {
    const dispatch = useDispatch()
    // dispatch(setPage('FILES'))
    const currentDir = useSelector(state => state.files.currentDir)
    const loader = useSelector(state => state.app.loader)
    const dirStack = useSelector(state => state.files.dirStack)
    const currentConference = useSelector(state => state.conference.currentConference)
    const conferenceID = JSON.parse(currentConference.conference.id)
    const [dragEnter, setDragEnter] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(() => {
       dispatch(setCurrentDir(conferenceID))
       dispatch(getFiles(conferenceID, sort))
    }, [currentDir, sort])

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout != false) {
            clearTimeout(searchTimeout)
        }
        dispatch(showLoader())
        if(e.target.value != '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }

    function fileUploadHandler(event) {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir, conferenceID)))
    }

    function dragEnterHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function dragLeaveHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir, conferenceID)))
        setDragEnter(false)
    }

    if(loader) {
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter ?
            <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                {/* Название папки и кнопка назад */}
                <Collapsible>
                <ul className="disk__settings">
                    <li> {/* Поиск */}
                        <input value={searchName}
                            onChange={e => searchChangeHandler(e)}
                            className='navbar__search'
                            type="text"
                            placeholder="Название файла..."/>
                    </li>
                    <li> {/* Загрузить файлы */}
                        <button className='button'>Загрузить файл</button>
                    </li>
                    <li> {/* Сортировка и вид */}
                        <select value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className='disk__select'>
                            <option value="name">По имени</option>
                            <option value="type">По типу</option>
                            <option value="date">По дате</option>
                        </select>
                        <button className="disk__plate" onClick={() => dispatch(setFileView('plate'))}/>
                        <button className="disk__list" onClick={() => dispatch(setFileView('list'))}/>
                    </li>
                </ul>
                </Collapsible>
                    {/* <button className="disk__back" onClick={() => backClickHandler()}>Назад</button> */}
                    {/* <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button> */}
                    <div className="disk__upload">
                        {/* <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label> */}
                        <input multiple={true} onChange={(event)=> fileUploadHandler(event)} type="file" id="disk__upload-input" className="disk__upload-input"/>
                    </div>
                {/* </div> */}
                <FileList/>
                <Popup/>
                <Uploader/>
            </div>
            :
            <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>
    );
};

export default Disk;
