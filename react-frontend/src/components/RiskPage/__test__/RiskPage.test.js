import React from "react";
import { render, screen } from "@testing-library/react";

import RiskPage from "../RiskPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders risk page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RiskPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("risk-datatable")).toBeInTheDocument();
    expect(screen.getByRole("risk-add-button")).toBeInTheDocument();
});
