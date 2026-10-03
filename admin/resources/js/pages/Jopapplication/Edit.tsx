import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { update } from "@/routes/Jopapplication";
type state = "pendding" | "accepted" | "rejected" | '';
export default function ApplicationStatusEditor({ id, initialStatus }: { id: string; initialStatus: state }) {
    const [status, setStatus] = useState(initialStatus);
    const [processing, setProcessing] = useState(false);
    const [saveFailed, setSaveFailed] = useState(false);

    useEffect(() => {
        setStatus(initialStatus);
    }, [initialStatus]);

    function updateStatus(nextStatus: state) {
        const previousStatus = status;
        setStatus(nextStatus);
        setProcessing(true);
        setSaveFailed(false);

        router.patch(update.url(id), { Status: nextStatus }, {
            preserveScroll: true,
            onError: () => {
                setStatus(previousStatus);
                setSaveFailed(true);
            },
            onFinish: () => setProcessing(false),
        });
    }

    return (
        <>
            <select
                aria-label="Update application status"
                value={status}
                disabled={processing}
                onChange={(event) => updateStatus(event.target.value as state)}
                className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 disabled:opacity-60"
            >
                <option value="pendding" className={`text-slate-700 ${status === 'pendding' ? 'bg-slate-200' : ''}`}>Pending</option>
                <option value="accepted" className={`text-slate-700 ${status === 'accepted' ? 'bg-slate-200' : ''}`}>Accepted</option>
                <option value="rejected" className={`text-slate-700 ${status === 'rejected' ? 'bg-slate-200' : ''}`}>Rejected</option>
            </select>
            {saveFailed && <span role="alert" className="text-red-600">Not saved</span>}
        </>
    );
}