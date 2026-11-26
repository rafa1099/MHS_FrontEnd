import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/navbar';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('list');
  const [mahasiswa, setMahasiswa] = useState([]);
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    alamat: '',
    tgl_lahir: '',
    jurusan: ''
  });

  const API_URL = 'http://localhost:5000/api/mahasiswa';

  // Ambil data mahasiswa (Read)
  const fetchMahasiswa = async () => {
    try {
      const response = await axios.get(API_URL);
      setMahasiswa(response.data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  useEffect(() => {
    fetchMahasiswa();
  }, []);

  // Handle perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Tambah data mahasiswa (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setFormData({ nim: '', nama: '', alamat: '', tgl_lahir: '', jurusan: '' });
      await fetchMahasiswa();
      alert('Data berhasil ditambahkan!');
      setActiveMenu('list');
    } catch (error) {
      console.error('Gagal menambah data:', error);
      alert('Gagal menambah data. Pastikan NIM belum terdaftar.');
    }
  };

  // Hapus data mahasiswa (Delete)
  const handleDelete = async (nim) => {
    if (window.confirm(`Yakin ingin menghapus data dengan NIM ${nim}?`)) {
      try {
        await axios.delete(`${API_URL}/${nim}`);
        fetchMahasiswa();
      } catch (error) {
        console.error('Gagal menghapus data:', error);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Navbar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        totalMahasiswa={mahasiswa.length}
      />

      <main style={{ maxWidth: '900px', margin: '30px auto', padding: '0 20px' }}>
        {activeMenu === 'tambah' ? (
          <div>
            <h2 style={{ marginBottom: '16px' }}>Tambah Data Mahasiswa</h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'grid',
                gap: '12px',
                marginBottom: '30px',
                padding: '20px',
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            >
              <input
                type="text"
                name="nim"
                placeholder="NIM"
                value={formData.nim}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="nama"
                placeholder="Nama Lengkap"
                value={formData.nama}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="alamat"
                placeholder="Alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
              />
              <div style={{ display: 'grid', gap: '4px' }}>
                <label htmlFor="tgl_lahir" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                  Tanggal Lahir
                </label>
                <input
                  id="tgl_lahir"
                  type="date"
                  name="tgl_lahir"
                  value={formData.tgl_lahir}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="jurusan"
                placeholder="Jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Tambah Mahasiswa
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >
              <h2 style={{ margin: 0 }}>Daftar Mahasiswa</h2>
              <button
                type="button"
                onClick={() => setActiveMenu('tambah')}
                style={{
                  padding: '8px 14px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                + Tambah Mahasiswa
              </button>
            </div>

            <table
              border="1"
              cellPadding="10"
              style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}
            >
              <thead style={{ backgroundColor: '#1f2937', color: '#f9fafb' }}>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Tanggal Lahir</th>
                  <th>Jurusan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mahasiswa.length > 0 ? (
                  mahasiswa.map((mhs) => (
                    <tr key={mhs.nim}>
                      <td>{mhs.nim}</td>
                      <td>{mhs.nama}</td>
                      <td>{mhs.alamat}</td>
                      <td>{mhs.tgl_lahir ? mhs.tgl_lahir.split('T')[0] : ''}</td>
                      <td>{mhs.jurusan}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDelete(mhs.nim)}
                          style={{
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center' }}>
                      Belum ada data mahasiswa.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;