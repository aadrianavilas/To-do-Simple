import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from "../api/tasks.api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description, done },
        } = await getTask(params.id);

        setValue("title", title);
        setValue("description", description);
        setValue("done", done);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateTask(params.id, data);
      toast.success("Tarea actualizada", {
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTask(data);
      toast.success("Tarea creada", {
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }
    navigate("/tasks");
  });

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          type="text"
          placeholder="Titulo"
          {...register("title", { required: true })}
        />

        {errors.title && <span>El título es requerido</span>}

        <textarea
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3 min-h-20"
          rows="3"
          placeholder="Descripción"
          {...register("description", { required: true })}
        ></textarea>

        {errors.description && <span>La descripción es requerido</span>}

        <label htmlFor="done" className="flex mb-3 mt-3 items-center gap-x-2">
          <input type="checkbox" id="done" {...register("done")} />
          Completada
        </label>

        <div
          className={
            params.id ? "grid grid-cols-3 gap-3" : "grid grid-cols-2 gap-3"
          }
        >
          <button className="bg-indigo-500 p-3 rounded-lg mt-3 cursor-pointer">
            Guardar
          </button>

          {params.id && (
            <div className="flex justify-end">
              <button
                className="bg-red-600 p-3 rounded-lg w-48 mt-3 hover:cursor-pointer"
                onClick={async () => {
                  const accepted = window.confirm("¿Estás seguro?");
                  if (accepted) {
                    await deleteTask(params.id);
                    toast.success("Tarea eliminada", {
                      style: {
                        background: "#101010",
                        color: "#fff",
                      },
                    });
                    navigate("/tasks");
                  }
                }}
              >
                Eliminar
              </button>
            </div>
          )}

          <Link
            to="/tasks"
            className="bg-yellow-600 p-3 rounded-lg mt-3 cursor-pointer text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
