import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { FaCalendarAlt } from "react-icons/fa";
import api from "../services/api";

type Reservation = {
    id: number;
    client: string;
    voiture_nom: string;
    date_debut: string;
    date_fin: string;
    montant: number;
    statut: "termine" | "annule" | "en_cours";
};

export default function Reservations() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        const res = await api.get("reservations/");
        setReservations(res.data);
        setLoading(false);
    };

    const couleurStatut = (statut: string) =>
        statut === "termine"
            ? "success"
            : statut === "annule"
                ? "danger"
                : "warning";

    const filtered = reservations.filter(
        (r) =>
            r.client.toLowerCase().includes(search.toLowerCase()) ||
            r.voiture_nom.toLowerCase().includes(search.toLowerCase())
    );

    const events = filtered.map((r) => ({
        id: String(r.id),
        title: `${r.client} - ${r.voiture_nom}`,
        start: r.date_debut,
        end: r.date_fin,
        color:
            r.statut === "termine"
                ? "#198754"
                : r.statut === "annule"
                    ? "#dc3545"
                    : "#ffc107",
    }));

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="voitures-page">
            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h2 className="page-title">
                        <FaCalendarAlt className="me-2 text-primary" />
                        Réservations
                    </h2>
                    <p className="page-subtitle">
                        Gestion et suivi des réservations
                    </p>
                </div>
            </div>

            {/* STATISTIQUES + RECHERCHE */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                    <span className="badge bg-primary me-2">
                        Total : {reservations.length}
                    </span>
                    <span className="badge bg-secondary">
                        Actives : {reservations.filter((r) => r.statut === "en_cours").length}
                    </span>
                </div>

                <input
                    className="form-control w-25"
                    placeholder="Rechercher client ou voiture..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLEAU DES RESERVATIONS */}
            <div className="card table-card mb-4">
                <div className="card-body">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Client</th>
                                <th>Voiture</th>
                                <th>Période</th>
                                <th>Montant</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((r, index) => (
                                <tr key={r.id}>
                                    <td>{index + 1}</td>
                                    <td>{r.client}</td>
                                    <td>{r.voiture_nom}</td>
                                    <td>
                                        {r.date_debut} → {r.date_fin}
                                    </td>
                                    <td>{r.montant} €</td>
                                    <td>
                                        <span className={`badge bg-${couleurStatut(r.statut)}`}>
                                            {r.statut}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center">
                                        Aucun résultat trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CALENDRIER */}
            <div className="card table-card">
                <div className="card-body">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={events}
                        height="auto"
                    />
                </div>
            </div>
        </div>
    );
}
