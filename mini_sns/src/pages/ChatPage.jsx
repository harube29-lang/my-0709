import { useState } from 'react'
import {
  Box, Typography, List, ListItem, ListItemAvatar, Avatar,
  ListItemText, Divider, IconButton, TextField, Paper
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import PeopleIcon from '@mui/icons-material/People'
import Layout from '../components/Layout'

const MOCK_ROOMS = [
  { id: 1, name: '강남 카페 투어', type: 'group', members: 4, lastMsg: '오늘 오후 3시에 만나요!', time: '5분 전', avatar: 'https://picsum.photos/seed/cafe1/50/50' },
  { id: 2, name: '카페인중독 ☕', type: 'direct', members: 1, lastMsg: '그 카페 진짜 맛있었어요', time: '1시간 전', avatar: 'https://picsum.photos/seed/user2/50/50' },
  { id: 3, name: '홍대 브런치 모임', type: 'group', members: 2, lastMsg: '내일 11시 맞죠?', time: '3시간 전', avatar: 'https://picsum.photos/seed/cafe2/50/50' },
]

const MOCK_MESSAGES = [
  { id: 1, sender: 'other', text: '안녕하세요! 오늘 카페 정말 좋았어요 ☕', time: '오후 2:30' },
  { id: 2, sender: 'me', text: '맞아요! 분위기가 너무 좋더라고요', time: '오후 2:31' },
  { id: 3, sender: 'other', text: '다음에 또 같이 가요~', time: '오후 2:32' },
  { id: 4, sender: 'me', text: '좋아요! 다음 주 어때요?', time: '오후 2:33' },
  { id: 5, sender: 'other', text: '오늘 오후 3시에 만나요!', time: '오후 2:35' },
]

const ChatPage = () => {
  const [activeRoom, setActiveRoom] = useState(null)
  const [msgInput, setMsgInput] = useState('')

  if (activeRoom) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', bgcolor: '#FFF8F5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* 채팅방 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1.5, bgcolor: '#fff', borderBottom: '1px solid #EFD9D4' }}>
          <IconButton onClick={() => setActiveRoom(null)} sx={{ color: '#6D4C41' }}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar src={activeRoom.avatar} sx={{ width: 36, height: 36, mx: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3E2723', lineHeight: 1.3 }}>
              {activeRoom.name}
            </Typography>
            {activeRoom.type === 'group' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <PeopleIcon sx={{ fontSize: 12, color: '#BCAAA4' }} />
                <Typography variant="caption" sx={{ color: '#BCAAA4' }}>{activeRoom.members}명</Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* 메시지 목록 */}
        <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {MOCK_MESSAGES.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: 1,
              }}
            >
              {msg.sender === 'other' && (
                <Avatar src={activeRoom.avatar} sx={{ width: 28, height: 28 }} />
              )}
              <Box sx={{ maxWidth: '70%' }}>
                <Paper
                  elevation={0}
                  sx={{
                    px: 1.5,
                    py: 1,
                    borderRadius: msg.sender === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    bgcolor: msg.sender === 'me' ? '#6D4C41' : '#fff',
                    border: msg.sender === 'me' ? 'none' : '1px solid #EFD9D4',
                  }}
                >
                  <Typography variant="body2" sx={{ color: msg.sender === 'me' ? '#fff' : '#3E2723' }}>
                    {msg.text}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ color: '#BCAAA4', px: 0.5 }}>{msg.time}</Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* 입력창 */}
        <Box sx={{ px: 2, py: 1.5, bgcolor: '#fff', borderTop: '1px solid #EFD9D4', display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="메시지를 입력하세요"
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 20 } }}
          />
          <IconButton sx={{ color: '#6D4C41' }}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    )
  }

  return (
    <Layout>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#3E2723', mb: 2 }}>채팅 💬</Typography>
        <List disablePadding>
          {MOCK_ROOMS.map((room, idx) => (
            <Box key={room.id}>
              <ListItem
                onClick={() => setActiveRoom(room)}
                sx={{ px: 0, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: '#FFF3EF' } }}
              >
                <ListItemAvatar>
                  <Avatar src={room.avatar} sx={{ border: '2px solid #EFD9D4' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#3E2723' }}>
                        {room.name}
                        {room.type === 'group' && (
                          <Typography component="span" variant="caption" sx={{ color: '#BCAAA4', ml: 0.5 }}>
                            {room.members}
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#BCAAA4' }}>{room.time}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#795548', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {room.lastMsg}
                    </Typography>
                  }
                />
              </ListItem>
              {idx < MOCK_ROOMS.length - 1 && <Divider sx={{ borderColor: '#F5EBE8' }} />}
            </Box>
          ))}
        </List>
      </Box>
    </Layout>
  )
}

export default ChatPage
