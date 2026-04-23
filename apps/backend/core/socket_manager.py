import socketio
from typing import Dict, Any

# Create a Socket.IO server with Redis as a message queue if needed
# mgr = socketio.AsyncRedisManager('redis://localhost:6379/0')
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio)

class GameSocketManager:
    def __init__(self):
        self.rooms: Dict[str, set] = {}

    async def handle_connect(self, sid, environ):
        print(f"Client connected: {sid}")

    async def handle_disconnect(self, sid):
        print(f"Client disconnected: {sid}")

    async def handle_join_game(self, sid, data):
        game_id = data.get('game_id')
        if game_id:
            await sio.enter_room(sid, game_id)
            print(f"Client {sid} joined game {game_id}")
            await sio.emit('player_joined', {'sid': sid}, room=game_id)

    async def handle_move(self, sid, data):
        game_id = data.get('game_id')
        move = data.get('move')
        if game_id and move:
            # Broadcast the move to everyone in the room except the sender
            await sio.emit('move_made', move, room=game_id, skip_sid=sid)

manager = GameSocketManager()

@sio.event
async def connect(sid, environ):
    await manager.handle_connect(sid, environ)

@sio.event
async def disconnect(sid):
    await manager.handle_disconnect(sid)

@sio.on('join_game')
async def on_join_game(sid, data):
    await manager.handle_join_game(sid, data)

@sio.on('make_move')
async def on_make_move(sid, data):
    await manager.handle_move(sid, data)
