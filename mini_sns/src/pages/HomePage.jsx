import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { supabase } from '../lib/supabase'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [user])

  const fetchPosts = async () => {
    setLoading(true)
    const { data: postsData } = await supabase
      .from('posts')
      .select(`
        *,
        profiles(nickname, profile_image_url)
      `)
      .order('created_at', { ascending: false })

    if (!postsData) { setLoading(false); return }

    // 댓글 수 및 최근 댓글 2개 가져오기
    const enriched = await Promise.all(
      postsData.map(async (post) => {
        const { count } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id)

        const { data: recentComments } = await supabase
          .from('comments')
          .select('*, profiles(nickname)')
          .eq('post_id', post.id)
          .order('created_at', { ascending: false })
          .limit(2)

        let userLiked = false
        if (user) {
          const { data: likeData } = await supabase
            .from('likes')
            .select('id')
            .eq('post_id', post.id)
            .eq('user_id', user.id)
            .maybeSingle()
          userLiked = !!likeData
        }

        return { ...post, comments_count: count || 0, recent_comments: recentComments || [], user_liked: userLiked }
      })
    )

    setPosts(enriched)
    setLoading(false)
  }

  return (
    <Layout>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 8 }}>
          <CircularProgress sx={{ color: '#6D4C41' }} />
        </Box>
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: 'center', pt: 8, px: 3 }}>
          <Typography variant="h6" sx={{ color: '#BCAAA4', mb: 1 }}>☕</Typography>
          <Typography variant="body1" sx={{ color: '#795548' }}>아직 게시물이 없어요</Typography>
          <Typography variant="body2" sx={{ color: '#BCAAA4', mt: 0.5 }}>첫 번째 카페 리뷰를 올려보세요!</Typography>
        </Box>
      ) : (
        <Box>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} onLikeUpdate={fetchPosts} />
          ))}
        </Box>
      )}
    </Layout>
  )
}

export default HomePage
