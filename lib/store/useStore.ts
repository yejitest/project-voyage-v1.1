import { create } from "zustand";
import type {
  DateRange,
  Destination,
  Attraction,
  Region,
  StoreState,
  StoreActions,
} from "@/lib/types";

const initialState: StoreState = {
  dateRange: { checkIn: null, checkOut: null },
  selectedDestination: null,
  selectedAttraction: null,
  isDestinationModalOpen: false,
  isAttractionModalOpen: false,
  activeRegionFilter: "all",
  activeModalTab: 0,
};

const useStore = create<StoreState & StoreActions>((set) => ({
  ...initialState,

  setDateRange: (range: DateRange) => set({ dateRange: range }),

  openDestinationModal: (destination: Destination) =>
    set({
      selectedDestination: destination,
      isDestinationModalOpen: true,
      activeModalTab: 0,
    }),

  closeDestinationModal: () =>
    set({
      isDestinationModalOpen: false,
      isAttractionModalOpen: false,
      selectedAttraction: null,
    }),

  openAttractionModal: (attraction: Attraction) =>
    set({
      selectedAttraction: attraction,
      isAttractionModalOpen: true,
    }),

  closeAttractionModal: () =>
    set({
      isAttractionModalOpen: false,
      selectedAttraction: null,
    }),

  setRegionFilter: (region: Region | "all") =>
    set({ activeRegionFilter: region }),

  setActiveModalTab: (tab: 0 | 1 | 2) => set({ activeModalTab: tab }),
}));

export default useStore;
