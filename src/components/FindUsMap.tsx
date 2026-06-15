"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  DivIcon,
  LayerGroup,
  Map as LeafletMap,
  Marker,
} from "leaflet";
import type { StoreLocation } from "@/app/find-us/locations";

type FindUsMapProps = {
  locations: StoreLocation[];
};

const defaultCenter: [number, number] = [39.8283, -98.5795];

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

export function FindUsMap({ locations }: FindUsMapProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? "");
  const [mapReady, setMapReady] = useState(false);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const iconRef = useRef<DivIcon | null>(null);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return locations;

    return locations.filter((location) =>
      [
        location.name,
        location.address,
        location.city,
        location.state,
        location.zip,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [locations, query]);

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      if (!mapElementRef.current || mapRef.current) return;

      const L = await import("leaflet");

      if (cancelled || !mapElementRef.current) return;

      const map = L.map(mapElementRef.current, {
        scrollWheelZoom: false,
      }).setView(defaultCenter, 4);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      iconRef.current = L.divIcon({
        className: "vye-map-marker",
        html: '<span class="vye-map-marker-dot"></span>',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
      });
      markerLayerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markersRef.current = {};
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !markerLayerRef.current) return;

    async function renderMarkers() {
      const L = await import("leaflet");
      const map = mapRef.current;
      const markerLayer = markerLayerRef.current;

      if (!map || !markerLayer) return;

      markerLayer.clearLayers();
      markersRef.current = {};

      filteredLocations.forEach((location) => {
        const marker = L.marker(location.coordinates, {
          icon: iconRef.current ?? undefined,
        }).bindPopup(
          `<strong>${escapeHtml(location.name)}</strong><br />${escapeHtml(location.address)}<br />${escapeHtml(location.city)}, ${escapeHtml(location.state)} ${escapeHtml(location.zip)}`,
        );

        marker.addTo(markerLayer);
        markersRef.current[location.id] = marker;
      });

      if (filteredLocations.length === 1) {
        map.setView(filteredLocations[0].coordinates, 12);
        return;
      }

      if (filteredLocations.length > 1) {
        const bounds = L.latLngBounds(
          filteredLocations.map((location) => location.coordinates),
        );
        map.fitBounds(bounds.pad(0.25), { maxZoom: 11 });
        return;
      }

      map.setView(defaultCenter, 4);
    }

    renderMarkers();
  }, [filteredLocations, mapReady]);

  function selectLocation(location: StoreLocation) {
    setSelectedId(location.id);
    mapRef.current?.setView(location.coordinates, 13);
    markersRef.current[location.id]?.openPopup();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-stretch">
      <section className="rounded-[2rem] border border-palm-green/10 bg-white p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:p-6">
        <label
          htmlFor="location-search"
          className="text-sm font-bold uppercase tracking-[0.16em] text-palm-green"
        >
          Search by city, state, or zip
        </label>
        <input
          id="location-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Miami or 78701"
          className="mt-4 min-h-12 w-full rounded-xl border border-palm-green/15 bg-coconut-cream px-5 text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink"
        />

        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-near-black/60">
          <span>
            {filteredLocations.length}{" "}
            {filteredLocations.length === 1 ? "location" : "locations"}
          </span>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="font-bold text-vye-pink transition hover:text-palm-green"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3">
          {filteredLocations.map((location) => (
            <button
              key={location.id}
              type="button"
              onClick={() => selectLocation(location)}
              className={`rounded-2xl px-5 py-4 text-left transition ${
                selectedId === location.id
                  ? "bg-palm-green text-white shadow-[0_14px_30px_rgba(36,90,53,0.18)]"
                  : "bg-coconut-cream text-near-black hover:bg-soft-water"
              }`}
            >
              <span className="block text-base font-black">
                {location.name}
              </span>
              <span
                className={`mt-2 block text-sm leading-6 ${
                  selectedId === location.id ? "text-white/75" : "text-near-black/62"
                }`}
              >
                {location.address}
                <br />
                {location.city}, {location.state} {location.zip}
              </span>
            </button>
          ))}

          {filteredLocations.length === 0 ? (
            <div className="rounded-2xl bg-coconut-cream px-5 py-5 text-sm leading-6 text-near-black/64">
              No locations match that search yet.
            </div>
          ) : null}
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-[0_18px_55px_rgba(31,41,51,0.08)]">
        <div
          ref={mapElementRef}
          aria-label="Vye retail location map"
          className="vye-map min-h-[520px] rounded-[1.5rem]"
        />
      </section>
    </div>
  );
}
