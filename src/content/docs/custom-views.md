Custom views replace the main content area while the sidebar and chat state stay available. They are useful for settings, model browsers, admin panels, or features that need a full-height surface.

## Create a view

~~~tsx
// features/my-feature/MyView.tsx
import { useViewStore } from "@/lib/view-registry";

export function MyView() {
  return (
    <section className="h-full overflow-auto p-6">
      <h1>My custom view</h1>
      <button type="button" onClick={() => useViewStore.getState().setActiveView(null)}>
        Back to chat
      </button>
    </section>
  );
}
~~~

## Register it

Register the component once when the feature module loads:

~~~tsx
import { registerView } from "@/lib/view-registry";
import { MyView } from "./MyView";

registerView("my-view", MyView);
~~~

Do not register from inside a React component. Rendering can happen many times.

## Open the view

~~~tsx
import { useViewStore } from "@/lib/view-registry";

useViewStore.getState().setActiveView("my-view");
~~~

Use `setActiveView(null)` to return to chat. Switching views does not remove conversations, folders, or the active chat.

## Registry helpers

- `registerView(id, component)` registers a named view.
- `useViewStore` reads and changes the active view.
- `getViewComponent(id)` returns a registered component.
- `getRegisteredViews()` lists the registered IDs.

Your view owns its padding, internal navigation, and scrolling. The content area gives it the available height and width.
