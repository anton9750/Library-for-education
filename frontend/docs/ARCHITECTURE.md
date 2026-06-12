# Frontend System Architecture (Atomic Design)

This frontend uses a modified **Atomic Design** system configured alongside utility-first styling classes.

## Folder Directory Strategy
- `components/atoms/` - Micro-UI elements that cannot be broken down further (Buttons, Inputs, Badges).
- `components/molecules/` - Combinations of atoms bonded together (FormFields, SearchBars, CardHeaders).
- `components/organisms/` - Complex UI structures handling data collections or global features (DataGrids, Navbars, Sidebars).
- `animations/` - Standalone utility primitives and style wrappers managing framerate-independent transitions.
- `snippets/` - Developer copy-paste registry warehouse for rapid layout scaffolding.