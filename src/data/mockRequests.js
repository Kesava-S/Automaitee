export const mockRequests = [
  {
    id: "req-101",
    title: "Zendesk integration sync error",
    type: "Bug report",
    details: "Our inbound Zendesk tickets are not syncing into our Slack channel. This started happening after the last platform update. Please inspect the sync hooks.",
    status: "In progress",
    submittedDate: "2026-05-15",
    latestUpdate: "We identified a connection timeout with the Zendesk OAuth token. We are currently refreshing the authorization credentials. Update expected by tomorrow morning."
  },
  {
    id: "req-102",
    title: "Add automated feedback loops for beauty salons",
    type: "New automation request",
    details: "We want to launch the SilentChurn feedback loops for salon visits. When a client finishes an appointment, automatically request a review after 2 hours.",
    status: "Resolved",
    submittedDate: "2026-05-10",
    latestUpdate: "Feedback loop automation has been successfully deployed. Post-visit triggers are active and reviews are flowing to the dashboard."
  },
  {
    id: "req-103",
    title: "Update monthly report email layout",
    type: "Service update",
    details: "Please adjust our monthly reporting email layout to group metrics by region. We need this update applied to the June report cycle.",
    status: "Cancelled",
    submittedDate: "2026-05-02",
    latestUpdate: "This request was cancelled per client request on 2026-05-05."
  }
];
