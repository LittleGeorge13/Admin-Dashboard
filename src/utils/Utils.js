import { supabase } from "../supabaseClient";

const getStoragePathFromPublicUrl = (publicUrl) => {
  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const publicIndex = pathParts.indexOf('public');

    if (publicIndex >= 0) {
      return pathParts.slice(publicIndex + 2).join('/');
    }

    return pathParts.slice(1).join('/');
  } catch (error) {
    console.error('Invalid Supabase public URL:', publicUrl, error);
    return null;
  }
};

export const handleUploadToStorage = async (file) => {
  try {
    if (!file) return '';

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('netflix')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('netflix')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    alert('Error uploading file: ' + error.message);
  }
};

export const deleteFileFromStorage = async (publicUrl) => {
  const filePath = getStoragePathFromPublicUrl(publicUrl);
  if (!filePath) return false;

  const { error } = await supabase.storage.from('netflix').remove([filePath]);

  if (error) {
    console.error('Error deleting file from Supabase storage:', error);
    throw error;
  }

  return true;
};