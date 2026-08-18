import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MyMap from "./Maps"; // ajusta la ruta según donde esté el archivo real

 
/**
 * Leaflet y react-leaflet dependen de APIs del navegador (canvas, getBoundingClientRect
 * con dimensiones reales, etc.) que no existen en jsdom. Por eso mockeamos react-leaflet
 * y react-leaflet-cluster con versiones "tontas" que solo renderizan children en HTML
 * simple, permitiéndonos verificar que el componente pasa los props/datos correctos
 * (markers, popups, iconos) sin intentar dibujar un mapa real.
 */
 
vi.mock("react-leaflet", () => {
  return {
    MapContainer: ({ children, center, zoom, ...props }: any) => (
      <div
        data-testid="map-container"
        data-center={JSON.stringify(center)}
        data-zoom={zoom}
        {...props}
      >
        {children}
      </div>
    ),
    TileLayer: (props: any) => (
      <div data-testid="tile-layer" data-url={props.url} />
    ),
    Marker: ({ children, position, icon }: any) => (
      <div
        data-testid="marker"
        data-position={JSON.stringify(position)}
        data-icon-classname={icon?.options?.className}
      >
        {children}
      </div>
    ),
    Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
  };
});
 
vi.mock("react-leaflet-cluster", () => {
  return {
    default: ({ children }: any) => (
      <div data-testid="cluster-group">{children}</div>
    ),
  };
});
 
// leaflet real usa canvas/Image internamente al crear divIcon; lo simplificamos
vi.mock("leaflet", () => {
  return {
    divIcon: (opts: any) => ({ options: opts }),
    point: (x: number, y: number, round?: boolean) => ({ x, y, round }),
  };
});
 
describe("MyMap", () => {
  it("renderiza el contenedor del mapa con el centro y zoom esperados", () => {
    render(<MyMap />);
 
    const container = screen.getByTestId("map-container");
    expect(container).toBeInTheDocument();
    expect(container.getAttribute("data-zoom")).toBe("5");
 
    const center = JSON.parse(container.getAttribute("data-center") || "[]");
    expect(center).toEqual([9.915085533193173, -84.0457210670351]);
  });
 
  it("renderiza el TileLayer de OpenStreetMap", () => {
    render(<MyMap />);
 
    const tileLayer = screen.getByTestId("tile-layer");
    expect(tileLayer).toHaveAttribute(
      "data-url",
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    );
  });
 
  it("renderiza un marcador por cada oficina definida", () => {
    render(<MyMap />);
 
    const markers = screen.getAllByTestId("marker");
    // Debe coincidir con la cantidad de entradas en el array `markers` del componente
    expect(markers.length).toBe(30);
  });
 
  it("incluye el marcador de la Oficina Central Curridabat con su posición correcta", () => {
    render(<MyMap />);
 
    const markers = screen.getAllByTestId("marker");
    const curridabat = markers.find((m) =>
      m.textContent?.includes("Oficina Central Curridabat")
    );
 
    expect(curridabat).toBeDefined();
    const position = JSON.parse(
      curridabat!.getAttribute("data-position") || "[]"
    );
    expect(position).toEqual([9.915085533193173, -84.0457210670351]);
  });
 
  it("renderiza el correo electrónico correcto dentro del popup de cada oficina", () => {
    render(<MyMap />);
 
    const popups = screen.getAllByTestId("popup");
 
    const curridabatPopup = popups.find((p) =>
      p.innerHTML.includes("costarica@grupocastrofallas.com")
    );
    const japonPopup = popups.find((p) =>
      p.innerHTML.includes("japon@grupocastrofallas.com")
    );
 
    expect(curridabatPopup).toBeDefined();
    expect(japonPopup).toBeDefined();
  });
 
  it("envuelve los marcadores dentro del MarkerClusterGroup", () => {
    render(<MyMap />);
 
    const clusterGroup = screen.getByTestId("cluster-group");
    const markersInsideCluster = screen.getAllByTestId("marker");
 
    markersInsideCluster.forEach((marker) => {
      expect(clusterGroup.contains(marker)).toBe(true);
    });
  });
});
 
