import React, { useEffect, useState } from "react";
import { auth } from "../../../services/api";
import "./profile.css";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    Name: "",
    Email: "",
    Image: null,
    ImagePreview: null,
    NewPass: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const user = await auth.getProfile();

        setForm({
          Name: user.Name || "",
          Email: user.Email || "",
          Image: null,
          ImagePreview: user.Image ? `${import.meta.env.VITE_API_URL}/${user.Image}` : null,
          NewPass: ""
        });

        setLoading(false);
      } catch (error) {
        console.error("Error cargando perfil", error);
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        Image: file,
        ImagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("Name", form.Name);
      formData.append("Email", form.Email);

      if (form.NewPass.trim() !== "") {
        formData.append("Pass", form.NewPass);
      }

      if (form.Image) {
        formData.append("Image", form.Image);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/account`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      if (!response.ok) throw new Error("Error al actualizar perfil");

      alert("Perfil actualizado ✔");
    } catch (error) {
      alert("Error al guardar cambios");
      console.error(error);
    }

    setSaving(false);
  };

  if (loading) return <p style={{ padding: 20 }}>Cargando perfil...</p>;

  function logout() {
    auth.logout();
    window.location.href = "/";
  }

  return (
    <div className="profile-container">
      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <div className="profile-pic-container">
          {form.ImagePreview ? (
            <img src={form.ImagePreview} alt="profile" className="profile-pic" />
          ) : (
            <div className="profile-empty-pic"></div>
          )}

          <label className="profile-camera-btn">
            📷
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          </label>
        </div>

        <h2 className="profile-name">{form.Name}</h2>
        <p className="profile-email">{form.Email}</p>

        <button className="profile-logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </aside>

      {/* MAIN */}
      <main className="profile-main">
        <h1 className="profile-title">Editar Perfil</h1>
        <p className="profile-subtitle">Gestiona tu información personal y privacidad.</p>

        <div className="profile-form-group">
          <label>Nombre</label>
          <input
            type="text"
            name="Name"
            value={form.Name}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={form.Email}
            onChange={handleChange}
            className="profile-input"
          />
        </div>

        <div className="profile-form-group">
          <label>Nueva Contraseña</label>
          <input
            type="password"
            name="NewPass"
            value={form.NewPass}
            onChange={handleChange}
            placeholder="Dejar vacío para no cambiar"
            className="profile-input"
          />
        </div>

        <button
          className="profile-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </main>
    </div>
  );
}

export default Profile;
