import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones para perfiles
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  
  if (error) throw error;
  return data;
};

// Funciones para posts
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (username, avatar_url),
      likes:likes (id, user_id),
      comments:comments (id, content, user_id, created_at)
    `)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const createPost = async (userId: string, content: string, imageUrl?: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: userId,
        content,
        image_url: imageUrl
      }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Funciones para likes
export const toggleLike = async (userId: string, postId: string) => {
  const { data: existingLike, error: checkError } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .single();

  if (checkError && checkError.code !== 'PGRST116') throw checkError;

  if (existingLike) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id);
    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from('likes')
      .insert([{ user_id: userId, post_id: postId }]);
    if (error) throw error;
    return true;
  }
};

// Funciones para comentarios
export const addComment = async (userId: string, postId: string, content: string) => {
  const { data, error } = await supabase
    .from('comments')
    .insert([
      {
        user_id: userId,
        post_id: postId,
        content
      }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Funciones para seguidores
export const followUser = async (followerId: string, followingId: string) => {
  const { data, error } = await supabase
    .from('followers')
    .insert([
      {
        follower_id: followerId,
        following_id: followingId
      }
    ])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  const { error } = await supabase
    .from('followers')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId);
  
  if (error) throw error;
}; 