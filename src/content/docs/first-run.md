The first-run flow keeps setup local to the device. You can complete it in one pass or skip a step and finish it later in Settings.

## Set a local profile

Choose the name Poly UI should use for this local profile. This is a device setting, not a Poly UI account.

## Connect a model or agent

The provider step checks the integrations that matter most:

- **Ollama** checks a local endpoint and discovers its available models.
- **API provider** validates a cloud or compatible endpoint and stores the credential in the operating system credential store.
- **Claude Code** and **Codex** check for an installed CLI and its existing sign-in.

You can choose **Set up later**. The same connections are available from Settings.

## Choose model access

Poly UI offers three access levels:

| Access level | What it allows |
| --- | --- |
| Chat only | Models respond without accessing files or commands. |
| Workspace access | Models can read and edit files inside folders you approve. |
| Agent tools | Models can use the sandboxed terminal for multi-step work. |

Start with the smallest access level that fits the task. You can change it later.

## Choose an appearance

Select System, Light, or Dark. The preference is stored on this device and can be changed in Settings.

## Finish

The final screen shows what was saved. Start a chat or open Settings to connect another provider, change permissions, or tune the appearance.

> [!TIP]
> You do not need to connect every provider up front. One working local model or API connection is enough to start.

