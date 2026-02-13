export const useUsuarios = () => {
  const config = useRuntimeConfig();

  const url = `${config.public.supabaseUrl}/rest/v1/usuarios`;
  //const apiKey = config.public.supabaseKey;
  const apiKey = config.public.supabaseAnonKey;

  // GET
  const obtenerUsuarios = async () => {
    const res = await fetch(url, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });
    return res.json();
  };

  // POST
  const agregarUsuario = async (usuario) => {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(usuario),
    });
  };

  // PUT
  const actualizarUsuario = async (id, usuario) => {
    await fetch(`${url}?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(usuario),
    });
  };

  // DELETE
  const eliminarUsuario = async (id) => {
    await fetch(`${url}?id=eq.${id}`, {
      method: "DELETE",
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
    });
  };

  return {
    obtenerUsuarios,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  };
};
