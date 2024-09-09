import { TotalFarmsCard } from "@/components/dashboard/total-farms-card";
import { render, screen } from "@testing-library/react";

describe("TotalFarmsCard", () => {
  it("renders without crashing", () => {
    render(<TotalFarmsCard totalFarms={10} totalHectares={100} />);
    expect(screen.getByText("Total de Fazendas")).toBeInTheDocument();
    expect(screen.getByText("Área Total (Hectares)")).toBeInTheDocument();
  });

  it("displays the correct total farms", () => {
    render(<TotalFarmsCard totalFarms={10} totalHectares={100} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("displays the correct total hectares", () => {
    render(<TotalFarmsCard totalFarms={10} totalHectares={100} />);
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});