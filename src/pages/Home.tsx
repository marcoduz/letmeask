import { useNavigate } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import {Button} from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home(){
    const navigate=useNavigate();
    const { signInWithGoogle, user } = useAuth();

    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if (!user){
           await signInWithGoogle()
        }

        navigate('/rooms/new');
        }

        async function handleJoinRoom(event: FormEvent) {
            event.preventDefault();

            if (roomCode.trim() == ''){
                return;
            }

            const roomRef = await database.ref(`rooms/${roomCode}`).get();

            if (!roomRef.exists()){
                alert('Room does not exists.')
                return;
            }

            navigate(`/rooms/${roomCode}`);
        }

    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas da sua audiência em tempo real</p>
            </aside>
                <main className='main-content'>
                    <img src={logoImg} alt="LetMeAsk" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" name="" id="" placeholder='digite o código da sala' onChange={event => setRoomCode(event.target.value)} value={roomCode}/>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </main>
        </div>
    )
}