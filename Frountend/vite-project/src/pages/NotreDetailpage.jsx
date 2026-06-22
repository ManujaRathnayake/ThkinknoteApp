import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data.note);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-2xl space-y-6">
    
    {/* Header Actions */}
    <div className="flex items-center justify-between px-1">
      <Link 
        to="/" 
        className="btn btn-ghost btn-sm gap-2 text-base-content/70 hover:text-base-content normal-case font-medium transition-colors"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Notes
      </Link>
      <button 
        onClick={handleDelete} 
        className="btn btn-error btn-outline btn-sm gap-2 border-opacity-20 hover:border-error transition-all"
      >
        <Trash2Icon className="h-4 w-4" />
        Delete Note
      </button>
    </div>

    {/* Main Editor Card */}
    <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
      <div className="card-body p-6 sm:p-8 space-y-6">
        
        {/* Title Input */}
        <div className="form-control w-full">
          <label className="label px-1">
            <span className="label-text font-semibold tracking-wide text-base-content/60 uppercase text-xl mb-3">
              Title
            </span>
          </label>
          <input
            type="text"
            placeholder="Note title"
            className="input input-bordered w-full text-lg font-medium focus:input-primary border-base-content/10 bg-base-200/30 focus:bg-base-100 transition-all placeholder:text-base-content/30"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        {/* Content Textarea */}
        <div className="form-control w-full">
          <label className="label px-1">
            <span className="label-text font-semibold tracking-wide text-base-content/60 uppercase text-xl mb-3">
              Content
            </span>
          </label>
          <textarea
            placeholder="Write your note here..."
            className="textarea textarea-bordered w-full h-64 text-base focus:textarea-primary border-base-content/10 bg-base-200/30 focus:bg-base-100 transition-all placeholder:text-base-content/30 leading-relaxed resize-y"
            value={note.content}
            onChange={(e) => setNote({ ...note, content: e.target.value })}
          />
        </div>

        {/* Form Actions */}
        <div className="card-actions justify-end pt-2">
          <button 
            className="btn btn-primary px-8 shadow-md hover:shadow-lg disabled:bg-base-300 transition-all normal-case font-medium" 
            disabled={saving} 
            onClick={handleSave}
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
        
      </div>
    </div>

  </div>
</div>
  );
};
export default NoteDetailPage;