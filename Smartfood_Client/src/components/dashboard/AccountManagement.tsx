import { Edit, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAllAdmins, createAdmin } from '../../api/admins';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface Admin {
  id_admin: number;
  nombre: string;
  correo: string;
  contrasena: string;
  telefono: string;
}

interface Staff {
  id: number;
  nombre: string;
  correo: string;
  turno: string;
}

export function AccountManagement() {
  const [showCreateAdminModal, setShowCreateAdminModal] = useState(false);
  const [showCreateStaffModal, setShowCreateStaffModal] = useState(false);
  const [showEditAdminModal, setShowEditAdminModal] = useState(false);
  const [showEditStaffModal, setShowEditStaffModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showPasswordAdmin, setShowPasswordAdmin] = useState(false);
  const [showPasswordStaff, setShowPasswordStaff] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [adminForm, setAdminForm] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
    repetirContraseña: '',
    telefono: '',
    codigoCorreo: '',
    codigoTelefono: '',
  });

  const [staffForm, setStaffForm] = useState({
    usuario: '',
    correo: '',
    contraseña: '',
    repetirContraseña: '',
    turno: '',
    cedulaA: '',
    cedulaB: '',
  });

  // Cargar administradores
  async function loadAdmins() {
    const res = await getAllAdmins()
    setAdmins(res.data)
    // console.log(res.data)
  }

  // Consultar api
  useEffect(() => {


    loadAdmins();
  }, []);

  // const admins: Admin[] = [
  //   { id: 1, nombre: 'admin1', correo: 'example@mail.com', telefono: '5632284500' },
  // ];

  const staff: Staff[] = [
    { id: 1, nombre: 'junta', correo: 'example@mail.com', turno: '100 - 3:00' },
  ];

  const handleCreateAdmin = handleSubmit(async data => {
    if (!data.nombre || !data.correo || !data.contrasena || !data.telefono) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }

    const res = await createAdmin(data);
    console.log(res);
    toast.success('Administrador creado exitosamente');
    setShowCreateAdminModal(false);
    resetAdminForm();
    loadAdmins();
  })

  const handleCreateStaff = () => {
    if (!staffForm.usuario || !staffForm.correo || !staffForm.contraseña) {
      toast.error('Completa todos los campos obligatorios');
      return;
    }
    if (staffForm.contraseña !== staffForm.repetirContraseña) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    toast.success('Personal creado exitosamente');
    setShowCreateStaffModal(false);
    resetStaffForm();
  };

  const handleEditAdmin = () => {
    toast.success('Administrador actualizado exitosamente');
    setShowEditAdminModal(false);
    resetAdminForm();
  };

  const handleEditStaff = () => {
    toast.success('Personal actualizado exitosamente');
    setShowEditStaffModal(false);
    resetStaffForm();
  };

  const resetAdminForm = () => {
    reset();
  };

  const resetStaffForm = () => {
    setStaffForm({
      usuario: '',
      correo: '',
      contraseña: '',
      repetirContraseña: '',
      turno: '',
      cedulaA: '',
      cedulaB: '',
    });
  };

  const openEditAdminModal = (admin: Admin) => {
    setAdminForm({
      usuario: admin.nombre,
      correo: admin.correo,
      contraseña: '1234',
      repetirContraseña: '1234',
      telefono: admin.telefono,
      codigoCorreo: '00000',
      codigoTelefono: '00000',
    });
    setShowEditAdminModal(true);
  };

  const openEditStaffModal = (staff: Staff) => {
    setStaffForm({
      usuario: staff.nombre,
      correo: staff.correo,
      contraseña: '1234',
      repetirContraseña: '1234',
      turno: staff.turno,
      cedulaA: '100 PM',
      cedulaB: '3:00 PM',
    });
    setShowEditStaffModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Administradores */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2>Administradores</h2>
              <button
                onClick={() => setShowCreateAdminModal(true)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Nuevo Administrador
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm">Nombre</th>
                  <th className="text-left py-3 px-2 text-sm">Correo</th>
                  <th className="text-left py-3 px-2 text-sm">Teléfono</th>
                  <th className="text-left py-3 px-2 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id_admin} className="border-b border-gray-100">
                    <td className="py-4 px-2">{admin.nombre}</td>
                    <td className="py-4 px-2">{admin.correo}</td>
                    <td className="py-4 px-2">{admin.telefono}</td>
                    <td className="py-4 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditAdminModal(admin)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirmModal(true)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Personal */}
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2>Personal</h2>
              <button
                onClick={() => setShowCreateStaffModal(true)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
              >
                Nuevo Personal
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm">Nombre</th>
                  <th className="text-left py-3 px-2 text-sm">Correo</th>
                  <th className="text-left py-3 px-2 text-sm">Turno</th>
                  <th className="text-left py-3 px-2 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((person) => (
                  <tr key={person.id} className="border-b border-gray-100">
                    <td className="py-4 px-2">{person.nombre}</td>
                    <td className="py-4 px-2">{person.correo}</td>
                    <td className="py-4 px-2">{person.turno}</td>
                    <td className="py-4 px-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditStaffModal(person)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirmModal(true)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateAdminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Crear Cuenta de Administrador</h2>
              <button onClick={() => setShowCreateAdminModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Usuario</label>
                  <input
                    type="text"
                    // value={adminForm.usuario}
                    // onChange={(e) => setAdminForm({ ...adminForm, usuario: e.target.value })}
                    {...register('nombre', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  {errors.nombre && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Correo electrónico</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      // value={adminForm.correo}
                      // onChange={(e) => setAdminForm({ ...adminForm, correo: e.target.value })}
                      {...register('correo', { required: true })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    {/* <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                      Verificar
                      </button> */}
                  </div>
                  {errors.correo && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                </div>

                <div>
                  <label className="block mb-2 text-sm">Contraseña</label>
                  <input
                    type="password"
                    // value={adminForm.contraseña}
                    // onChange={(e) => setAdminForm({ ...adminForm, contraseña: e.target.value })}
                    {...register('contrasena', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                  {errors.contrasena && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                </div>

                {/* <div>
                  <label className="block mb-2 text-sm">Repetir la Contraseña</label>
                  <input
                    type="password"
                    value={adminForm.repetirContraseña}
                    onChange={(e) => setAdminForm({ ...adminForm, repetirContraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div> */}

                <div>
                  <label className="block mb-2 text-sm">Teléfono</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      // value={adminForm.telefono}
                      // onChange={(e) => setAdminForm({ ...adminForm, telefono: e.target.value })}
                      {...register('telefono', { required: true })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    {/* <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                      Verificar
                      </button> */}
                  </div>
                  {errors.telefono && <span className="text-red-500 text-sm">Este campo es obligatorio</span>}
                </div>

                {/* <div>
                  <label className="block mb-2 text-sm">Código de Seguridad enviado al correo</label>
                  <input
                    type="text"
                    value={adminForm.codigoCorreo}
                    onChange={(e) => setAdminForm({ ...adminForm, codigoCorreo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Código de Seguridad enviado al teléfono</label>
                  <input
                    type="text"
                    value={adminForm.codigoTelefono}
                    onChange={(e) => setAdminForm({ ...adminForm, codigoTelefono: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div> */}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowCreateAdminModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateAdmin}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Staff Modal */}
      {showCreateStaffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Crear Cuenta de Personal</h2>
              <button onClick={() => setShowCreateStaffModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Usuario</label>
                  <input
                    type="text"
                    value={staffForm.usuario}
                    onChange={(e) => setStaffForm({ ...staffForm, usuario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Correo electrónico</label>
                  <input
                    type="email"
                    value={staffForm.correo}
                    onChange={(e) => setStaffForm({ ...staffForm, correo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Contraseña</label>
                  <input
                    type="password"
                    value={staffForm.contraseña}
                    onChange={(e) => setStaffForm({ ...staffForm, contraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Repetir la Contraseña</label>
                  <input
                    type="password"
                    value={staffForm.repetirContraseña}
                    onChange={(e) => setStaffForm({ ...staffForm, repetirContraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Turno</label>
                  <input
                    type="text"
                    value={staffForm.turno}
                    onChange={(e) => setStaffForm({ ...staffForm, turno: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Cédula</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={staffForm.cedulaA}
                      onChange={(e) => setStaffForm({ ...staffForm, cedulaA: e.target.value })}
                      placeholder="100 PM"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <span className="text-sm">A</span>
                    <input
                      type="text"
                      value={staffForm.cedulaB}
                      onChange={(e) => setStaffForm({ ...staffForm, cedulaB: e.target.value })}
                      placeholder="3:00 PM"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowCreateStaffModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreateStaff}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {showEditAdminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Editar Cuenta de Administrador</h2>
              <button onClick={() => setShowEditAdminModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Usuario</label>
                  <input
                    type="text"
                    value={adminForm.usuario}
                    onChange={(e) => setAdminForm({ ...adminForm, usuario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Correo electrónico</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={adminForm.correo}
                      onChange={(e) => setAdminForm({ ...adminForm, correo: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                      Verificar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Contraseña</label>
                  <input
                    type="password"
                    value={adminForm.contraseña}
                    onChange={(e) => setAdminForm({ ...adminForm, contraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Repetir la Contraseña</label>
                  <input
                    type="password"
                    value={adminForm.repetirContraseña}
                    onChange={(e) => setAdminForm({ ...adminForm, repetirContraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Teléfono</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={adminForm.telefono}
                      onChange={(e) => setAdminForm({ ...adminForm, telefono: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                      Verificar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Código de Seguridad enviado al correo</label>
                  <input
                    type="text"
                    value={adminForm.codigoCorreo}
                    onChange={(e) => setAdminForm({ ...adminForm, codigoCorreo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Código de Seguridad enviado al teléfono</label>
                  <input
                    type="text"
                    value={adminForm.codigoTelefono}
                    onChange={(e) => setAdminForm({ ...adminForm, codigoTelefono: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowEditAdminModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditAdmin}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditStaffModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
              <h2>Editar Cuenta de Personal</h2>
              <button onClick={() => setShowEditStaffModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6">
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm">Usuario</label>
                  <input
                    type="text"
                    value={staffForm.usuario}
                    onChange={(e) => setStaffForm({ ...staffForm, usuario: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Correo electrónico</label>
                  <input
                    type="email"
                    value={staffForm.correo}
                    onChange={(e) => setStaffForm({ ...staffForm, correo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Contraseña</label>
                  <input
                    type="password"
                    value={staffForm.contraseña}
                    onChange={(e) => setStaffForm({ ...staffForm, contraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Repetir la Contraseña</label>
                  <input
                    type="password"
                    value={staffForm.repetirContraseña}
                    onChange={(e) => setStaffForm({ ...staffForm, repetirContraseña: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Turno</label>
                  <input
                    type="text"
                    value={staffForm.turno}
                    onChange={(e) => setStaffForm({ ...staffForm, turno: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm">Cédula</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={staffForm.cedulaA}
                      onChange={(e) => setStaffForm({ ...staffForm, cedulaA: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                    <span className="text-sm">A</span>
                    <input
                      type="text"
                      value={staffForm.cedulaB}
                      onChange={(e) => setStaffForm({ ...staffForm, cedulaB: e.target.value })}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowEditStaffModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEditStaff}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8">
            <div className="mb-6">
              <h3 className="mb-3">¿Está seguro?</h3>
              <p className="text-sm text-gray-600">
                Esta acción no se puede deshacer. El usuario será eliminado permanentemente del sistema.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm">Escriba los códigos de seguridad:</p>

              <div>
                <label className="block mb-2 text-sm">Código de Seguridad enviado al correo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Código de Seguridad enviado al teléfono</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowDeleteConfirmModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    toast.success('Usuario eliminado exitosamente');
                    setShowDeleteConfirmModal(false);
                  }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
