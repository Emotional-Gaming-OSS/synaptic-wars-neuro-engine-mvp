# EEG Simulator Module Documentation

## Overview
The EEG Simulator module generates realistic EEG data streams that simulate brainwave patterns associated with different emotional states. This allows the neuro-adaptive system to function without requiring actual EEG hardware.

## Class: EEGSimulator

### Constructor()
Initializes the EEG simulator with default values.

**Properties:**
- `isConnected`: Boolean indicating if the simulator is connected
- `dataStream`: Interval ID for the data generation loop
- `currentData`: Object containing the current EEG values
  - `alpha`: Alpha wave values (8-12 Hz)
  - `beta`: Beta wave values (13-30 Hz)
  - `theta`: Theta wave values (4-7 Hz)
  - `delta`: Delta wave values (0.5-3 Hz)
  - `gamma`: Gamma wave values (30+ Hz)
  - `focus`: Focus level (0-1)
  - `meditation`: Meditation level (0-1)
- `simulationMode`: Current simulation mode ('dynamic', 'focused', 'stressed', 'relaxed')
- `onDataUpdate`: Callback function for data updates

### Methods

#### connect()
Connects the simulator and starts the data stream.

**Returns:**
- Boolean indicating success

**Side Effects:**
- Sets isConnected to true
- Starts the data stream interval
- Logs connection status to console

#### disconnect()
Disconnects the simulator and stops the data stream.

**Side Effects:**
- Clears the data stream interval
- Sets isConnected to false
- Logs disconnection status to console

#### startDataStream()
Starts the EEG data generation interval.

**Returns:**
- Current EEG data

**Side Effects:**
- Clears any existing data stream
- Sets up a new interval to update EEG data every second

#### updateEEGData()
Generates new EEG data based on the current simulation mode and applies variations.

**Side Effects:**
- Updates the currentData property with new values
- Calls onDataUpdate callback with new data if defined

#### setSimulationMode(mode)
Changes the simulation mode which affects the type of EEG data generated.

**Parameters:**
- `mode`: New simulation mode ('dynamic', 'focused', 'stressed', 'relaxed')

**Returns:**
- Boolean indicating if the mode was valid and changed

**Side Effects:**
- Updates simulationMode property
- Logs mode change to console

#### getCurrentData()
Returns a copy of the current EEG data.

**Returns:**
- Object containing current EEG values

#### setDataUpdateHandler(callback)
Sets the callback function to be called when new EEG data is generated.

**Parameters:**
- `callback`: Function to call with new EEG data

## Simulation Modes

The simulator supports different emotional state modes that affect the generated EEG data:

- **Focused**: High beta wave activity, higher focus values
- **Stressed**: High beta and gamma activity, elevated focus
- **Relaxed**: High alpha wave activity, higher meditation values
- **Dynamic**: Smoothly cycles between states over time

## Dependencies

- None (standalone simulation module)

## Usage Notes

- The simulator is used in place of real EEG hardware for MVP
- The data generated is realistic but not actual brainwave data
- The simulation provides enough variation to test the neuro-adaptive system