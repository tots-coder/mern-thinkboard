import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async () => {
    // prompts user for delete confirmation
    // if user declines discontinue function
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    // continue function if user confirms deletion
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      // redirect to homepage if deletion is successful
      navigate("/");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }
    // prompts user for update confirmation
    // if user declines discontinue function
    if (!window.confirm("This will update the note.")) return;
    setSaving(true);
    // continue function if user confirms update
    try {
      await api.put(`/notes/${id}`, {
        title: note.title.trim(),
        content: note.content.trim(),
      });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      // redirect to homepage if update is successful
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
        console.log(res.data.note);
      } catch (error) {
        console.error("Error in fetching note", error);
        if (error.response.status === 429) {
          toast.error(
            "Too many requests at a short span of time, slow down a bit",
            {
              duration: 4000,
              icon: "☠️",
            }
          );
        } else {
          toast.error("Failed to fetch the note");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  console.log({ note });

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}
              disabled={saving}
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Edit Note</h2>
              <form onSubmit={(e) => handleSave(e)}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    // value={!loading ? note.title : ""} // will work if no loading spinner added
                    value={note.title}
                    onChange={(e) =>
                      setNote({ ...note, title: e.target.value })
                    }
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    // value={!loading ? note.content : ""} // will work if no loading spinner added
                    value={note.content}
                    onChange={(e) =>
                      setNote({ ...note, content: e.target.value })
                    }
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={saving}
                    onClick={(e) => handleSave(e)}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
