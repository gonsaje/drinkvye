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

function getDirectionsUrl(location: StoreLocation) {
  const query = `${location.address}, ${location.city}, ${location.state} ${location.zip}`;

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function FindUsMap({ locations }: FindUsMapProps) {
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [selectedId, setSelectedId] = useState(locations[0]?.id ?? "");
  const [mapReady, setMapReady] = useState(false);
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const iconRef = useRef<DivIcon | null>(null);

  const stateOptions = useMemo(
    () =>
      Array.from(new Set(locations.map((location) => location.state))).sort(),
    [locations],
  );

  const cityOptions = useMemo(() => {
    const cities = locations
      .filter((location) => !stateFilter || location.state === stateFilter)
      .map((location) => location.city);

    return Array.from(new Set(cities)).sort((a, b) => a.localeCompare(b));
  }, [locations, stateFilter]);

  const filteredLocations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return locations.filter((location) => {
      const matchesState = !stateFilter || location.state === stateFilter;
      const matchesCity = !cityFilter || location.city === cityFilter;
      const searchableText = [
        location.name,
        location.address,
        location.city,
        location.state,
        location.zip,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesState && matchesCity && matchesQuery;
    });
  }, [cityFilter, locations, query, stateFilter]);

  const hasActiveFilters = Boolean(query || stateFilter || cityFilter);
  const selectedLocationId = filteredLocations.some(
    (location) => location.id === selectedId,
  )
    ? selectedId
    : (filteredLocations[0]?.id ?? "");

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

  function updateStateFilter(value: string) {
    setStateFilter(value);
    setCityFilter((currentCity) => {
      if (!currentCity) return currentCity;

      const cityStillAvailable = locations.some(
        (location) =>
          (!value || location.state === value) && location.city === currentCity,
      );

      return cityStillAvailable ? currentCity : "";
    });
  }

  function clearFilters() {
    setQuery("");
    setStateFilter("");
    setCityFilter("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.78fr_1fr] lg:items-stretch">
      <section className="rounded-[2rem] border border-palm-green/10 bg-white p-5 shadow-[0_18px_55px_rgba(31,41,51,0.08)] sm:p-6">
        <label
          htmlFor="location-search"
          className="text-sm font-bold uppercase tracking-[0.16em] text-palm-green"
        >
          Search by store, city, state, or zip
        </label>
        <input
          id="location-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Brooklyn or 19103"
          className="mt-4 min-h-12 w-full rounded-xl border border-palm-green/15 bg-coconut-cream px-5 text-near-black outline-none transition placeholder:text-near-black/35 focus:border-vye-pink"
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label
            htmlFor="state-filter"
            className="text-xs font-bold uppercase tracking-[0.14em] text-palm-green"
          >
            State
            <select
              id="state-filter"
              value={stateFilter}
              onChange={(event) => updateStateFilter(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-palm-green/15 bg-coconut-cream px-4 text-sm font-bold normal-case tracking-normal text-near-black outline-none transition focus:border-vye-pink"
            >
              <option value="">All states</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

          <label
            htmlFor="city-filter"
            className="text-xs font-bold uppercase tracking-[0.14em] text-palm-green"
          >
            City
            <select
              id="city-filter"
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
              className="mt-2 min-h-12 w-full rounded-xl border border-palm-green/15 bg-coconut-cream px-4 text-sm font-bold normal-case tracking-normal text-near-black outline-none transition focus:border-vye-pink"
            >
              <option value="">All cities</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 text-sm text-near-black/60">
          <span>
            {filteredLocations.length}{" "}
            {filteredLocations.length === 1 ? "location" : "locations"}
          </span>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="font-bold text-vye-pink transition hover:text-palm-green"
            >
              Clear
            </button>
          ) : null}
        </div>

        <div className="mt-5 grid max-h-[520px] gap-3 overflow-y-auto pr-1">
          {filteredLocations.map((location) => {
            const isSelected = selectedLocationId === location.id;

            return (
              <article
                key={location.id}
                className={`rounded-2xl transition ${
                  isSelected
                    ? "bg-palm-green text-white shadow-[0_14px_30px_rgba(36,90,53,0.18)]"
                    : "bg-coconut-cream text-near-black hover:bg-coconut-green/20"
                }`}
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => selectLocation(location)}
                    className="min-w-0 flex-1 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vye-pink"
                  >
                    <span className="block text-base font-black">
                      {location.name}
                    </span>
                    <span
                      className={`mt-2 block text-sm leading-6 ${
                        isSelected ? "text-white/75" : "text-near-black/62"
                      }`}
                    >
                      {location.address}
                      <br />
                      {location.city}, {location.state} {location.zip}
                    </span>
                  </button>

                  {isSelected ? (
                    <a
                      href={getDirectionsUrl(location)}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-5 mb-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-black text-palm-green transition hover:bg-coconut-cream hover:text-vye-pink sm:mb-0 sm:ml-0"
                    >
                      Get Directions
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}

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
