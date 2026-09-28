import { selectHeartbeatEnvironment } from "./heartbeat/environment-selection.js";
import { prepareHeartbeatWorkspace } from "./heartbeat/workspace-preparation.js";
import { executeHeartbeatRuntime, NativeSessionResumeScheduledError, NativeWorkspaceFinalizeScheduledError } from "./heartbeat/runtime-execution.js";
import { selectHeartbeatRuntime } from "./heartbeat/runtime-selection.js";
import { createHeartbeatRunCompletion } from "./heartbeat/run-completion.js";
export {
  MAX_TURN_CONTINUATION_WAKE_REASON,
  parseSandboxProviderPluginNotReadyFailureMessage,
  isConfigurationIncompleteFailedRun,
  isWorkspaceSyncConflictFailure,
} from "./heartbeat/run-completion.js";
import {
  createHeartbeatScheduling,
  formatIssueIdentifierLink,
} from "./heartbeat/scheduling.js";
import { FAST_RESPONSE_AGENT_GUIDANCE, fastResponseHistoryBody } from "@paperclipai/shared";
import { agentExecutionsHaveStopped } from "./agent-execution-stop.js";
import {
  cancelHeartbeatNativeRun,
  terminateHeartbeatRunProcess,
  providerResourceDispositionForTerminalRun,
  createHeartbeatRunControl,
  type CancelRunOptions,
} from "./heartbeat/run-control.js";
export {
  leaseReleaseStatusForRunStatus,
  providerResourceDispositionForTerminalRun,
  cancelHeartbeatNativeRun,
} from "./heartbeat/run-control.js";
import {
  isHeartbeatRunTerminalStatus,
  isHeartbeatRunRuntimeStatusActive,
  publishHeartbeatRunRuntimeProgress,
  decorateHeartbeatRunRuntimeStatus,
  createHeartbeatLifecycle,
} from "./heartbeat/run-lifecycle.js";
export {
  redactDetectedSuccessfulRunProgressSummaryForBoard,
  redactSuccessfulRunHandoffEvidence,
  persistHeartbeatRunProcessMetadata,
  resolveSkillTestRunCompletionForHeartbeatOutcome,
} from "./heartbeat/run-lifecycle.js";
import {
  shouldDeferFollowupWakeForSameIssue,
  shouldQueueFollowupForRunningIssueWake,
  DEFERRED_WAKE_CONTEXT_KEY,
  createHeartbeatQueue,
} from "./heartbeat/queue.js";
export {
  shouldDeferFollowupWakeForSameIssue,
  shouldQueueFollowupForRunningIssueWake,
} from "./heartbeat/queue.js";
import {
  isProcessAlive,
  createHeartbeatRecovery,
} from "./heartbeat/recovery.js";
import {
  BOUNDED_TRANSIENT_HEARTBEAT_RETRY_MAX_ATTEMPTS,
  isWorkspaceBusyDeferral,
  createHeartbeatRetries,
} from "./heartbeat/retries.js";
export {
  BOUNDED_TRANSIENT_HEARTBEAT_RETRY_DELAYS_MS,
  WORKSPACE_BUSY_RETRY_WAKE_REASON,
  WORKSPACE_BUSY_ERROR_CODE,
  WORKSPACE_BUSY_RETRY_BASE_DELAY_MS,
  WORKSPACE_BUSY_RETRY_JITTER_MS,
  WORKSPACE_BUSY_HOLDER_STALE_AFTER_MS,
  type SharedWorkspaceHolder,
  WorkspaceBusyDeferral,
  computeWorkspaceBusyRetryDelayMs,
  computeBoundedTransientHeartbeatRetrySchedule,
} from "./heartbeat/retries.js";
import {
  EXECUTION_REVIEW_PARTICIPANT_RECOVERY_WAKE_REASON,
  deriveTaskKeyWithHeartbeatFallback,
  getAdapterSessionCodec,
  shouldResetTaskSessionForWake,
  normalizeSessionParams,
  normalizeResumeParamsForAdapter,
  truncateDisplayId,
  resolveLedgerScopeForRun,
  describeSessionResetReason,
  isCanonicalSessionIdForAdapter,
  requiresCanonicalSessionIds,
  resolveNextSessionState,
  resolveCacheAdjustedCostUsd,
  resolveLedgerCostStatus,
  createHeartbeatRunState,
} from "./heartbeat/run-state.js";
export {
  summarizeHeartbeatRunContextSnapshot,
  summarizeHeartbeatRunListResultJson,
  normalizeBilledCostCents,
  resolveLedgerCostStatus,
  resolveCacheAdjustedCostUsd,
  resolveLedgerScopeForRun,
  buildExplicitResumeSessionOverride,
  normalizeAdapterRunUsage,
  parseSessionCompactionPolicy,
  deriveTaskKeyWithHeartbeatFallback,
  shouldResetTaskSessionForWake,
  describeSessionResetReason,
  normalizeSessionParams,
  resolveNextSessionState,
} from "./heartbeat/run-state.js";

import {
  ConfigurationIncompleteFailure,
  deriveTaskKey,
  type WakeupOptions,
  mergeCoalescedContextSnapshot,
  PAPERCLIP_EXTERNAL_CHAT_EXECUTION_BOUND_KEY,
  PAPERCLIP_HARNESS_CHECKOUT_KEY,
  attestReviewedExternalChatRun,
  resolveAcceptedPlanWakeRoutingDecision,
  clearInteractionContinuationWakeContext,
  buildPaperclipWakePayload,
  PAPERCLIP_WAKE_PAYLOAD_KEY,
  resolveRunScopedMentionedSkillKeys,
  resolveExecutionRunAdapterConfig,
  applyRunScopedMentionedSkillKeys,
  MANAGED_GITHUB_TOKEN_KEYS,
  configuredPaperclipApiBaseUrl,
  createHeartbeatRunPreparation,
} from "./heartbeat/run-preparation.js";
export {
  ConfigurationIncompleteFailure,
  resolveExecutionRunAdapterConfig,
  extractMentionedSkillIdsFromSources,
  applyRunScopedMentionedSkillKeys,
  revokeHeartbeatRunGatewayTokens,
  buildPaperclipRuntimeMcpServers,
  createManagedMcpRunConfig,
  mergeCoalescedContextSnapshot,
  resolveExternalChatWakeProvider,
  attestReviewedExternalChatRun,
  buildPaperclipWakePayload,
} from "./heartbeat/run-preparation.js";
import {
  buildExecutionWorkspaceConfigSnapshot,
  stripWorkspaceRuntimeFromExecutionRunConfig,
  buildEffectiveRunSessionConfigMetadata,
  readConfigFingerprintFromSessionParams,
  readConfiguredModelFromAdapterConfig,
  resolveTaskSessionConfigFreshness,
  stripPaperclipSessionMetadataFromSessionParams,
  resolveRuntimeSessionParamsForWorkspace,
  buildRunWorkspaceHints,
  buildReferencedProjectRunObservability,
  assertGitSensitiveAdapterWorkspaceValid,
  type EffectiveRunSessionConfigMetadata,
  createHeartbeatWorkspaceResolver,
} from "./heartbeat/workspaces.js";
export {
  WorkspaceValidationFailure,
  requiresPushCapabilityPreflight,
  applyPersistedExecutionWorkspaceConfig,
  mergeExecutionWorkspaceMetadataForPersistence,
  resolveExecutionWorkspaceBranchOwnership,
  stripWorkspaceRuntimeFromExecutionRunConfig,
  stripHostWorkspaceProvisionForLowTrustSandbox,
  preflightLowTrustWorkspaceIsolation,
  resolveWorkspaceAfterLowTrustPreflight,
  ensureManagedProjectWorkspace,
  prepareProjectRepositoryWorkspaces,
  type ResolveAdditionalProjectWorkspaceDeps,
  resolveAdditionalProjectWorkspace,
  assertGitWorktreeBaseWorkspaceReady,
  assertPushCapabilityCheckoutValid,
  reconcileReusedExecutionWorkspaceProjectWorkspaceId,
  assertGitSensitiveAdapterWorkspaceValid,
  type ResolvedAdditionalWorkspace,
  type WorkspaceMaterializationFailure,
  type ResolvedWorkspaceForRun,
  buildAnchorFallbackWorkspaceNotes,
  buildRunWorkspaceHints,
  prioritizeProjectWorkspaceCandidatesForRun,
  MULTI_PROJECT_WORKSPACE_SYNC_ENV,
  isMultiProjectWorkspaceSyncEnabled,
  isRemoteExecutionEnvironmentDriver,
  MULTI_PROJECT_WORKSPACE_SYNC_REMOTE_ENV,
  isMultiProjectWorkspaceSyncRemoteEnabled,
  isConfinedRemoteStagingDriver,
  MAX_RUN_REFERENCED_ADDITIONAL_PROJECTS,
  MAX_RUN_REFERENCED_CANDIDATE_EVALUATIONS,
  type RunReferencedProject,
  type ReferencedProjectFailureReason,
  type ReferencedProjectFailure,
  type ResolvedRunReferencedProjects,
  type ResolveRunReferencedProjectsOptions,
  resolveRunReferencedProjects,
  type ResolveAdditionalRunWorkspacesOptions,
  resolveAdditionalRunWorkspaces,
  type ReferencedProjectRunObservability,
  buildReferencedProjectRunObservability,
  resolveRuntimeSessionParamsForWorkspace,
  type EffectiveRunWorkspaceConfigMetadata,
  type ExecutionWorkspaceReuseRequestForIssue,
  resolveNativeRecoveryExecutionWorkspaceBinding,
  resolveExecutionWorkspaceReuseRequestForIssue,
  resolveExecutionWorkspaceReuseProvisioningPolicy,
  provisionExecutionWorkspaceForFreshnessDecision,
  buildWorkspaceConfigFreshnessOperation,
  buildEffectiveRunSessionConfigMetadata,
  buildEffectiveRunWorkspaceConfigMetadata,
  resolveExecutionWorkspaceConfigFreshness,
  isTaskSessionCredentialCompatible,
  shouldResetTaskSessionForModelChange,
  stripConfiguredModelFromSessionParams,
  stripPaperclipSessionMetadataFromSessionParams,
  resolveTaskSessionConfigFreshness,
} from "./heartbeat/workspaces.js";
import {
  appendExcerpt,
  boundHeartbeatRunEventPayloadForStorage,
  compactRunLogChunk,
} from "./heartbeat/run-log.js";
export {
  boundHeartbeatRunEventPayloadForStorage,
  compactRunLogChunk,
} from "./heartbeat/run-log.js";
import { buildPaperclipTaskMarkdown } from "./heartbeat/task-markdown.js";
export { buildPaperclipTaskMarkdown } from "./heartbeat/task-markdown.js";

import { decisionModelService } from "./decision-models.js";
import { TASK_QUESTION_GUIDANCE } from "./issue-question-context.js";
import { createAgentIdentityRedactor } from "./agent-identity-redaction.js";
import { agentIdentityService, supportsManagedAgentIdentity } from "./agent-identity.js";

import { prepareConnectionInstructionDelivery } from "./connection-instructions.js";
import { resolveAssignedConnectionInstructionsForRun } from "./native-runtime/assigned-mcp-tools.js";

import {
  startupCancellationFence,
} from "./native-runtime/native-cancellation-request.js";
import {
  prepareChatCompletionTurn,
  chatCompletionInstruction,
} from "./chat-completion-delivery.js";
import { AgentDirectoryReuseInvalidatedError, isAgentDirectoryCopy } from "./agent-directory-working-copies.js";

import type { PaperclipTurnContext } from "@paperclipai/adapter-utils/server-utils";

import {
  NativeWorkspaceFinalizationBusyError,
  NativeWorkspaceFinalizationOwnershipLostError,
} from "./native-runtime/native-workspace-finalization-ownership.js";

import { reserveRunBudget } from "./budget-reservations.js";
import { accountRunCost, createCostAccountingReconciler } from "./run-cost-accounting.js";

import { toolActionDeliveryService } from "./tool-action-delivery.js";
import { liveVoiceExecutionGuidance } from "./voice/voice-execution-guidance.js";
import { githubBotConnectionIdsForRun } from "./chat-github-tools.js";

import {
  isConversation,
  prepareConversationTurn,
  settleConversationTurn,
} from "./agent-conversations.js";
import { withAdapterExecutionPhase } from "@paperclipai/adapter-utils/execution-phase";
import { getConversationConfirmationContext } from "./conversation-confirmation-context.js";
import {
  recordNativeLocalProcessStop,
} from "./native-local-process-stop.js";

import {
  legacyControllerBootId,
  watchLegacyControllerLease,
} from "./legacy-controller-lease.js";

import { applyConnectorSkills, prepareConnectorSkillDelivery, resolveConnectorAssignments } from "./connector-runtime.js";

import { connectionIntentService } from "./connection-intents.js";
import {
  prepareManagedAiRuntime,
  assertManagedAiProjectAuth,
  stripAiAuthBindings,
  isAiConnectionBusy,
  AI_AUTH_ENV_KEYS,
} from "./ai-connection-runtime.js";
import { aiConnectionBindingSchema, aiRuntimeConnectionBindingSchema, type AiConnectionRouterSelection } from "@paperclipai/shared";
import { aiConnectionRouterService, AiConnectionPoolExhausted, applyAiConnectionRouterTaskSettings } from "./ai-connection-router.js";
import { aiConnectionSessionCompatibilityInputs, managedAiSessionIdentityCompatible } from "./ai-connection-session.js";
import {
  getExecutionBlocker,
} from "./execution-blocker.js";
import {
  claimedAdapterType,
} from "./conversation-continuation.js";

import {
  settleInterruptedNativeBootstrap,
} from "./legacy-execution-recovery.js";
import {
  adapterExecutionControls,
  createAdapterExecutionControl,
} from "./adapter-execution-control.js";
import { executionFailureRetryCount } from "./execution-recovery-attempt.js";
import { buildHeartbeatRunStatusLiveEventPayload } from "./heartbeat-run-status-payload.js";
export { buildHeartbeatRunStatusLiveEventPayload } from "./heartbeat-run-status-payload.js";
import { buildExecutionContinuation, StaleExecutionContinuationError } from "./execution-continuation.js";
import { renderPaperclipWakePrompt } from "@paperclipai/adapter-utils/server-utils";

import {
  initializeRunIdentity,
} from "./run-identity.js";
import {
  authorizeFailedChatRunRetryWake,
} from "./durable-chat-wakeup.js";
import { prepareHeartbeatGitHubLaunchers } from "./heartbeat-github-launchers.js";
import {
  cleanupGitHubOperationLaunchers,
  prepareGitHubExecutionEnvironment,
  startAdapterExecutionTargetPaperclipBridge,
} from "@paperclipai/adapter-utils/execution-target";
import { agentInstructionWorkingCopyService, collectStoppedInstructionCopyWithRetries, instructionWorkingCopyGuidance } from "./agent-instruction-working-copies.js";

import fs from "node:fs/promises";
import path from "node:path";
import { execFile as execFileCallback } from "node:child_process";
import { promisify } from "node:util";
import {
  createHash,
} from "node:crypto";
import {
  and,
  desc,
  eq,
  exists,
  inArray,
  isNull,
  notInArray,
  or,
  sql,
} from "drizzle-orm";
import type { Db } from "@paperclipai/db";
import {
  CHAT_PROVIDERS,
  ISSUE_DISPOSITION_REPAIR_RETRY_REASON,
  isEnvironmentDriverSupportedForAdapter,
} from "@paperclipai/shared";
import {
  agents,
  agentConfigRevisions,
  agentWakeupRequests,
  chatActions,
  heartbeatRuns,
  environmentLeases,
  issueComments,
  issues,
  nativeRunFinalizations,
  projects,
  projectWorkspaces,
} from "@paperclipai/db";
import { HttpError, notFound } from "../errors.js";

import { logger } from "../middleware/logger.js";
import {
  resolveManagedGitHubIdentitySelection,
  scrubGitCredentialText,
} from "./git-credentials.js";
// Re-exported because heartbeat's workspace surface exposed the scrubber before the
// git-credentials module became its canonical home; existing importers keep working.
export { scrubGitCredentialText };
import { publishLiveEvent } from "./live-events.js";

import {
  queuedCommentIdsFromRunContext,
} from "./issue-queued-comment-queue.js";

import { getTaskPlanContext } from "./task-plan-context.js";

import {
  claimWarmNativeInstructionCopy,
  nativeSessionWorkspaceScope,
  reserveWarmNativeInstructionDirectory,
  dispatchNativeSessionResumptions,
  NativeCancellationPendingRecoveryError,
  NativeControllerDetachedForRestartError,
  prepareNativeWorkspaceSync,
  type NativeRestartRecoveryClaim,
  resolveHeartbeatNativeRuntimeMode,
} from "./native-runtime/index.js";

import {
  recordFailedSkillPreparation,
  type NativeRunHistoricalSpan,
} from "./native-runtime/native-run-trace.js";
import {
  parseNativeExecutionInput,
  type NativeExecutionInput,
  type NativeSessionBackend,
} from "../vendor/paperclip-runner/index.js";
import { createNativeSessionHandoffLoader } from "./native-runtime/native-session-handoff.js";

import { getRunLogStore, type RunLogHandle } from "./run-log-store.js";
import {
  providerTraceStore,
} from "./provider-trace-store.js";
import { getServerAdapter, runningProcesses } from "../adapters/index.js";
import type {
  AdapterInvocationMeta,
  AdapterRuntimeEvent,
} from "../adapters/index.js";

import { createRuntimeToolsToken } from "../runtime-tools-token.js";
import {
  parseObject,
} from "../adapters/utils.js";

import {
  EXTERNAL_CHAT_QUESTION_RESPONSE_KEY,
} from "./native-runtime/external-chat-question-response.js";

import {
  NativeRunnerOwnershipUnverifiedError,
  isNativeRunnerOwnershipHeld,
  NATIVE_OWNERSHIP_UNVERIFIED_ERROR_CODE,
} from "./native-runtime/native-runner-ownership.js";
import { trackAgentFirstHeartbeat } from "@paperclipai/shared/telemetry";
import { getTelemetryClient } from "../telemetry.js";
import {
  emitAgentTaskRun,
  emitAgentTaskRunById,
} from "./agent-task-run-telemetry.js";
import { readAiConnectionConfigurationFailure, readAiCredentialAccessFailure } from "./ai-connection-configuration-failure.js";
import { reportRunFailure } from "./run-failure-report.js";

import { collectRunFailureSecretValues, type RunFailureReportOptions } from "./run-failure-diagnostics.js";
import { companySkillService } from "./company-skills.js";
import {
  budgetService,
} from "./budgets.js";
import {
  secretService,
} from "./secrets.js";
import {
  resolveDefaultAgentWorkspaceDir,
} from "../home-paths.js";
import {
  buildHeartbeatRunIssueComment,
} from "./heartbeat-run-summary.js";

import {
  logActivity,
  type LogActivityInput,
} from "./activity-log.js";
import {
  buildWorkspaceReadyComment,
  buildWorkspaceReadyMetadata,
  buildWorkspaceReadyPresentation,
  ensureRuntimeServicesForRun,
  persistAdapterManagedRuntimeServices,
  releaseRuntimeServicesForRun,
  type RealizedExecutionWorkspace,
  type RuntimeServiceRef,
} from "./workspace-runtime.js";

import { issueService } from "./issues.js";
import {
  failRunnerGoalAction,
} from "./runner-goals.js";

import {
  parseIssueExecutionState,
} from "./issue-execution-policy.js";
import {
  issueTreeControlService,
} from "./issue-tree-control.js";
import {
  continuationSummaryParksExecutor,
  getIssueContinuationSummaryDocument,
} from "./issue-continuation-summary.js";

import {
  executionWorkspaceService,
} from "./execution-workspaces.js";
import {
  workspaceOperationService,
} from "./workspace-operations.js";
import {
  isProcessGroupAlive,
} from "./local-service-supervisor.js";

import {
  HEARTBEAT_RUN_SCRATCH_MARKER,
  buildHeartbeatRunScratchEnv,
  cleanupHeartbeatRunScratch,
  prepareHeartbeatRunScratch,
  type HeartbeatRunScratch,
} from "./run-scratch.js";
import {
  applyDefaultIsolatedExecutionWorkspacePolicy,
  buildExecutionWorkspaceAdapterConfig,
  gateProjectExecutionWorkspacePolicy,
  parseIssueExecutionWorkspaceSettings,
  parseProjectExecutionWorkspacePolicy,
  resolveExecutionWorkspaceMode,
  selectEnvironmentExecutionWorkspaceSettings,
} from "./execution-workspace-policy.js";
import {
  instanceSettingsService,
  resolveWorktreeRunExecutionActivation,
} from "./instance-settings.js";

import {
  buildConfigurationIncompleteRecoveryNoticeSeed,
  buildExecutionReviewParticipantRecoveryNoticeSeed,
  buildImmediateExecutionPathRecoveryNoticeSeed,
  buildWorkspaceValidationRecoveryNoticeSeed,
  type StrandedRecoveryNoticeSeed,
} from "./recovery/stranded-notice.js";

import { recoveryService } from "./recovery/service.js";
import {
  createRunDispatch,
  type PostCommitEffect,
  MAX_TURN_CONTINUATION_RETRY_REASON,
  WORKSPACE_BUSY_RETRY_REASON,
  AI_CONNECTION_BUSY_RETRY_REASON,
  AI_CONNECTION_POOL_WAIT_RETRY_REASON,
  INTERACTION_CONTINUATION_INFRA_RETRY_REASON,
  INTERACTION_CONTINUATION_INFRA_WAKE_REASON,
  isNonAssigneeWorkspaceBusyRetry,
  extractWakeCommentIds,
  deriveCommentId,
  isResolvedInteractionContinuationWakeContext,
} from "../modules/run-dispatch/index.js";
import {
  createWakeQueue,
  type IssueSnapshot as WakeQueueIssueSnapshot,
  type PostCommitEffect as WakeQueuePostCommitEffect,
  type ReleaseRecoveryBlockedNoticeKind,
  type RunSnapshot as WakeQueueRunSnapshot,
} from "../modules/wake-queue/index.js";

import { taskWatchdogService } from "./task-watchdogs.js";

import {
  evaluateAgentInvokabilityFromDb,
  DIRECT_NON_INVOKABLE_STATUSES,
} from "./agent-invokability.js";

import {
  redactQuarantinedBodyForHigherTrust,
  sanitizeQuarantinedCommentForHigherTrust,
} from "./source-trust.js";
import {
  redactCurrentUserText,
} from "../log-redaction.js";

import { createRunSecretRedactionRegistry } from "./run-secret-redaction.js";

import {
  readPaperclipSkillSyncPreference,
} from "@paperclipai/adapter-utils/server-utils";

import { environmentService } from "./environments.js";

import {
  environmentRuntimeService,
  type ProviderResourceDisposition,
} from "./environment-runtime.js";
import { skillVersionSelectionMap } from "./runtime-skill-selections.js";
import { environmentRunOrchestrator } from "./environment-run-orchestrator.js";

import {
  clearHeartbeatRunRuntimeStatus,
  sweepExpiredHeartbeatRunRuntimeStatuses,
  touchHeartbeatRunRuntimeStatus,
} from "./heartbeat-run-runtime-status.js";

import {
  assertLowTrustRuntimeServicesAllowed,
} from "./low-trust-runtime-containment.js";

import { resolveAndRetainRunTrustPreset } from "./run-trust-preset.js";

import type { PluginWorkerManager } from "./plugin-worker-manager.js";

import { computeTaskDrain, applyTaskDrain, startTaskDrain, stopTaskDrain, readTaskDrain } from "./task-admission.js";

const MAX_LIVE_LOG_CHUNK_BYTES = 8 * 1024;

const ACCEPTED_PLAN_CONVERSION_SKILL_KEY =
  "paperclipai/paperclip/paperclip-converting-plans-to-tasks";

const execFile = promisify(execFileCallback);
const UNSUCCESSFUL_HEARTBEAT_RUN_TERMINAL_STATUSES = [
  "failed",
  "cancelled",
  "timed_out",
] as const;

export {
  ACTIVE_RUN_OUTPUT_CONTINUE_REARM_MS,
  ACTIVE_RUN_OUTPUT_CRITICAL_THRESHOLD_MS,
  ACTIVE_RUN_OUTPUT_SUSPICION_THRESHOLD_MS,
} from "./recovery/service.js";
export const ACTIVE_RUN_OUTPUT_PROGRESS_FLUSH_INTERVAL_MS = 60 * 1000;
export const ACTIVE_RUN_LOG_RUNTIME_STATUS_REFRESH_INTERVAL_MS = 5 * 1000;

export {
  INTERACTION_CONTINUATION_INFRA_RETRY_REASON,
  INTERACTION_CONTINUATION_INFRA_WAKE_REASON,
};
const WORKSPACE_VALIDATION_RECOVERY_CAUSE = "workspace_validation_failed";

const CONFIGURATION_INCOMPLETE_RECOVERY_CAUSE = "configuration_incomplete";
const EXECUTION_REVIEW_PARTICIPANT_RECOVERY_RETRY_REASON =
  "execution_review_participant_recovery";

const EXECUTION_REVIEW_PARTICIPANT_RECOVERY_CAUSE =
  "execution_review_participant_recovery";

export { MAX_TURN_CONTINUATION_RETRY_REASON };

export { WORKSPACE_BUSY_RETRY_REASON };

export { isNonAssigneeWorkspaceBusyRetry };

// Routes and the scheduler construct separate heartbeatService instances, but
// they must agree on in-process adapter executions when reaping stale runs.
const activeRunExecutions = new Set<string>();
// A legacy process adapter's signal exit can race the operator cancellation CAS while
// its owned process group is still being joined. Keep that exit from becoming
// a successful result (or a competing failure) before Stop settles. This is an
// in-process ordering barrier, not durable cancellation or provider authority.
// Embedded adapters use their own cancellation control and acknowledgement.
const processRunCancellationSettlements = new Map<
  string,
  {
    settled: Promise<void>;
    failed: boolean;
    error?: unknown;
  }
>();
// Keep failed Stop evidence until the exact executor exits, independently of
// the active owner barrier. A later Stop may retry a still-owned live child.
const failedProcessRunCancellations = new Map<
  string,
  { settled: Promise<void>; failed: boolean; error?: unknown }
>();
// Background heartbeat executions are dispatched fire-and-forget (see
// startNextQueuedRunForAgent), so the promise that resolves once a run's DB
// writes are fully flushed is otherwise unobservable. Track those promises here
// — shared across service instances like activeRunExecutions above — so callers
// that must guarantee no run write is still in flight (graceful shutdown, and
// tests tearing down a shared database) can await drainActiveRunExecutions().
const activeRunExecutionPromises = new Set<Promise<void>>();
// Routes dispatch a wakeup fire-and-forget (void heartbeat.wakeup(...)). The
// wakeup promise stays pending through its asynchronous prologue, and it
// resolves only after it inserts the queued run and registers the run
// execution in activeRunExecutionPromises. Before that point neither
// activeRunExecutionPromises nor the run table shows the pending run, so a
// caller cannot observe the wake. Track each wakeup promise here — shared
// across service instances like the two sets above — so drainActiveRunExecutions
// can await a wake that is still before run registration. A caller that tears
// down a shared database (a test afterEach) then cannot race a late wake.
const activeWakeupPromises = new Set<Promise<unknown>>();
const nativeSessionResumeDispatchTimers = new Map<
  string,
  ReturnType<typeof setTimeout>
>();
// Shared with HTTP admission so an idle hold fences work before inspection.
export { computeTaskDrain, applyTaskDrain, startTaskDrain, stopTaskDrain } from "./task-admission.js";

/**
 * Report the task-drain state for this process only. `activeRuns` and
 * `pendingWakes` count in-process work. A process restart clears both
 * counters, even when the database still holds `running` rows for runs
 * this process did not finish.
 */
export function getTaskDrainStatus(): {
  draining: boolean;
  startedAt: Date | null;
  expiresAt: Date | null;
  activeRuns: number;
  pendingWakes: number;
  quiescent: boolean;
  ownerId?: string;
} {
  const state = readTaskDrain(new Date());
  const activeRuns = activeRunExecutionPromises.size;
  const pendingWakes = activeWakeupPromises.size;
  return {
    ...(state?.ownerId ? { ownerId: state.ownerId } : {}),
    draining: state !== null,
    startedAt: state?.startedAt ?? null,
    expiresAt: state?.expiresAt ?? null,
    activeRuns,
    pendingWakes,
    quiescent: activeRuns === 0 && pendingWakes === 0,
  };
}

export { type NativeSandboxLifecycle } from "./heartbeat/runtime-selection.js";

export { resolveReusableSandboxLifecycle } from "./heartbeat/runtime-selection.js";

export { resolveNativeSandboxLifecycle } from "./heartbeat/runtime-selection.js";

interface ParsedIssueAssigneeAdapterOverrides {
  adapterConfig: Record<string, unknown> | null;
  useProjectWorkspace: boolean | null;
}

function readNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function parseIssueAssigneeAdapterOverrides(
  raw: unknown,
): ParsedIssueAssigneeAdapterOverrides | null {
  const parsed = parseObject(raw);
  const parsedAdapterConfig = parseObject(parsed.adapterConfig);
  const adapterConfig =
    Object.keys(parsedAdapterConfig).length > 0 ? parsedAdapterConfig : null;
  const useProjectWorkspace =
    typeof parsed.useProjectWorkspace === "boolean"
      ? parsed.useProjectWorkspace
      : null;
  if (!adapterConfig && useProjectWorkspace === null) return null;
  return {
    adapterConfig,
    useProjectWorkspace,
  };
}

export function formatRuntimeWorkspaceWarningLog(warning: string) {
  return {
    stream: "stdout" as const,
    chunk: `[paperclip] ${warning}\n`,
  };
}

/**
 * A run is a "zombie" if it's marked as running in the DB but has no live
 * execution tracked in memory. This happens when the server restarts and the
 * execution is lost, or when the DB row outlives the in-memory run state.
 *
 * Queued runs are never zombies — they don't have processes yet.
 */
export function isZombieRun(
  run: { status: string; id: string },
  tracked: { has(id: string): boolean },
): boolean {
  return run.status === "running" && !tracked.has(run.id);
}

/**
 * Filter a coalesce target — if it's a zombie run, return null so the
 * wakeup falls through to create a new queued run instead of coalescing
 * into the dead process (which would refresh updatedAt and make it immortal).
 *
 * Queued runs pass through unchanged (they have no process yet).
 * Null targets pass through unchanged.
 */
export function filterZombieCoalesceTarget<
  T extends { status: string; id: string },
>(target: T | null, tracked: { has(id: string): boolean }): T | null {
  return target && isZombieRun(target, tracked) ? null : target;
}

export function shouldAutoCheckoutIssueForWake(input: {
  contextSnapshot: Record<string, unknown> | null | undefined;
  issueStatus: string | null;
  issueAssigneeAgentId: string | null;
  issueExecutionState?: unknown;
  isDependencyReady: boolean;
  agentId: string;
}) {
  if (input.issueAssigneeAgentId !== input.agentId) return false;
  if (!input.isDependencyReady) return false;
  const executionState = parseIssueExecutionState(input.issueExecutionState);
  if (executionState?.status === "pending") return false;

  const issueStatus = readNonEmptyString(input.issueStatus);
  if (
    issueStatus !== "todo" &&
    issueStatus !== "backlog" &&
    issueStatus !== "blocked" &&
    issueStatus !== "in_progress"
  ) {
    return false;
  }

  const wakeReason = readNonEmptyString(input.contextSnapshot?.wakeReason);
  if (!wakeReason) return false;
  if (wakeReason === "issue_comment_mentioned") return false;
  if (wakeReason === "source_scoped_recovery_action") return false;
  if (wakeReason.startsWith("execution_")) return false;

  return true;
}

export function resolvedInteractionCheckoutExpectedStatuses() {
  // A resolved interaction authorizes a new provider turn. Review describes
  // the idle handoff state; once this turn acquires execution it must become
  // in_progress in the same guarded checkout update.
  return ["in_progress", "in_review"] as const;
}

function isCheckoutConflictError(error: unknown): boolean {
  return (
    error instanceof HttpError &&
    error.status === 409 &&
    error.message === "Issue checkout conflict"
  );
}

export { extractWakeCommentIds };

function runTaskKey(run: typeof heartbeatRuns.$inferSelect) {
  return deriveTaskKey(
    run.contextSnapshot as Record<string, unknown> | null,
    null,
  );
}

function isSameTaskScope(left: string | null, right: string | null) {
  return (left ?? null) === (right ?? null);
}

export type HeartbeatEnvironmentRuntime = ReturnType<
  typeof environmentRuntimeService
>;

export interface HeartbeatServiceOptions {
  /** Test seam before the atomic native runtime handoff. */
  beforeNativeRuntimeSelection?: (runId: string) => Promise<void>;
  /** Test seam immediately before the durable chat-control admission check. */
  beforeChatControlRecoveryCheck?: (input: {
    runId: string;
    issueId: string;
    stage: "claim" | "dispatch";
  }) => Promise<void>;
  pluginWorkerManager?: PluginWorkerManager;
  environmentRuntime?: HeartbeatEnvironmentRuntime;
  runtimeEnv?: Record<string, string | undefined>;
  /**
   * Provider-boundary seam for persisted native-run recovery tests. Keeping
   * the seam here exercises the production reaper, claim, execution, package
   * session loop, persistence port, and finalizer without spawning a provider.
   */
  nativeSessionBackendFactory?: (
    execution: NativeExecutionInput,
  ) => NativeSessionBackend;
  /** Test seam for observing the native-session shutdown boundary before lease destruction. */
  closeWarmNativeSessionsForRun?: (input: {
    runId: string;
    reason: string;
  }) => Promise<{ closed: number; busy: number; failed: number }>;
  /** Test seam for changing a continuation issue at the final pre-dispatch boundary. */
  beforeResolvedInteractionContinuationDispatchCheck?: (input: {
    runId: string;
    issueId: string;
  }) => Promise<void>;
  /** Test seam for racing an issue mutation immediately before the final dispatch gate. */
  afterResolvedInteractionContinuationDispatchCheck?: (input: {
    runId: string;
    issueId: string;
  }) => Promise<void>;
}

type WorkspaceReadyCommentWriter = {
  addComment: (
    issueId: string,
    body: string,
    actor: { agentId?: string; userId?: string; runId?: string | null },
    options?: {
      presentation?: ReturnType<typeof buildWorkspaceReadyPresentation>;
      metadata?: ReturnType<typeof buildWorkspaceReadyMetadata>;
    },
  ) => Promise<unknown>;
};

export function postWorkspaceReadyComment(input: {
  issuesSvc: WorkspaceReadyCommentWriter;
  issueId: string;
  agentId: string;
  runId: string;
  workspace: RealizedExecutionWorkspace;
  runtimeServices: RuntimeServiceRef[];
}) {
  const workspaceReadyInput = {
    workspace: input.workspace,
    runtimeServices: input.runtimeServices,
  };
  return input.issuesSvc.addComment(
    input.issueId,
    buildWorkspaceReadyComment(workspaceReadyInput),
    { agentId: input.agentId, runId: input.runId },
    {
      presentation: buildWorkspaceReadyPresentation(workspaceReadyInput),
      metadata: buildWorkspaceReadyMetadata(workspaceReadyInput),
    },
  );
}

export { postNativeModelFallbackWarning } from "./heartbeat/runtime-selection.js";

function isTruthyRuntimeEnvValue(value: string | undefined) {
  return value === "true" || value === "1" || value === "yes" || value === "on";
}

export function resolveHeartbeatSchedulingSuppression(
  env: Record<string, string | undefined> = process.env,
  overrides: { allowWorktreeRunExecution?: boolean } = {},
): {
  suppressed: boolean;
  reason:
    "worktree_instance" | "database_restore_in_progress" | "task_drain" | null;
} {
  if (
    isTruthyRuntimeEnvValue(env.PAPERCLIP_IN_WORKTREE) &&
    !overrides.allowWorktreeRunExecution
  ) {
    return { suppressed: true, reason: "worktree_instance" };
  }
  if (
    isTruthyRuntimeEnvValue(env.PAPERCLIP_DATABASE_RESTORE_IN_PROGRESS) ||
    isTruthyRuntimeEnvValue(env.PAPERCLIP_RESTORE_IN_PROGRESS)
  ) {
    return { suppressed: true, reason: "database_restore_in_progress" };
  }
  if (readTaskDrain(new Date()) !== null) {
    return { suppressed: true, reason: "task_drain" };
  }
  return { suppressed: false, reason: null };
}

// Parses PAPERCLIP_ADAPTER_CONCURRENCY_LIMITS, an optional JSON object mapping
// adapter type -> a positive integer cap on how many runs using that adapter
// type may be "running" at once across the whole instance, e.g.
// '{"opencode":5,"litellm":10}'. Unset, unparsable, or non-object input yields
// {} (no limits), which is the default: the feature is opt-in and changes no
// behavior for anyone who has not set it. Non-finite or non-positive entries
// are dropped rather than treated as "no limit" or "zero forever", so a typo
// degrades to "that adapter type is unthrottled" instead of silently wedging
// every run using it.
export function resolveAdapterConcurrencyLimits(
  env: Record<string, string | undefined> = process.env,
): Record<string, number> {
  const raw = env.PAPERCLIP_ADAPTER_CONCURRENCY_LIMITS;
  if (!raw || !raw.trim()) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return {};
  }
  const limits: Record<string, number> = {};
  for (const [adapterType, value] of Object.entries(
    parsed as Record<string, unknown>,
  )) {
    const parsedValue = typeof value === "number" ? value : Number(value);
    if (Number.isFinite(parsedValue) && parsedValue > 0) {
      limits[adapterType] = Math.floor(parsedValue);
    }
  }
  return limits;
}

export function heartbeatService(
  db: Db,
  options: HeartbeatServiceOptions = {},
) {
  const {
    getAgent,
    resolveSessionBeforeForWakeup,
    getRun,
    ensureRuntimeState,
    getTaskSession,
    getLatestAgentConfigRevision,
    evaluateSessionCompaction,
    upsertTaskSession,
    resolveNormalizedUsageForSession,
    clearTaskSessions,
    resolveExplicitResumeSessionOverride,
    hasResolvablePriorSessionWorkspaceForWake,
    getRunLogAccess,
    listRuns,
    getRuntimeStateWithSessions,
    listTaskSessions,
    resetRuntimeSession,
    listEvents,
    getRetryExhaustedReason,
    getRunIssueSummary,
    getActiveRunForAgent,
    getActiveRunIssueSummaryForAgent,
  } = createHeartbeatRunState(db);
  const {
    toAgentOrgRow,
    listCompanyAgentOrgRows,
    groupAgentOrgRowsByCompany,
    getIssueExecutionContext,
    getPinnedSkillTestContext,
    getRoutineEnvForExecutionIssue,
    resolveResponsibleUserIdForRunSeed,
    resolveResponsibleUserIdForRun,
    resolveResponsibleUserIdForRunContext,
  } = createHeartbeatRunPreparation(db);
  let shutdownInProgress = false;
  const instanceSettings = instanceSettingsService(db);
  const getCurrentUserRedactionOptions = async () => ({
    enabled: (await instanceSettings.getGeneral()).censorUsernameInLogs,
  });
  const runtimeEnv = options.runtimeEnv ?? process.env;
  const inWorktreeRuntime = isTruthyRuntimeEnvValue(
    runtimeEnv.PAPERCLIP_IN_WORKTREE,
  );
  // Preview worktree instances suppress the run engine by default. Users can lift
  // that per-worktree via the `enableWorktreeRunExecution` experimental setting
  // (worktree instances have their own isolated DB, so it can't affect the parent).
  // Only worktree runtimes ever read the setting; a short TTL keeps the hot-path
  // suppression checks off the DB, and a read failure falls back to prior/default
  // (fail closed to suppression).
  let cachedWorktreeRunExecutionOverride: {
    allowed: boolean;
    cutoff: Date | null;
    at: number;
  } = {
    allowed: false,
    cutoff: null,
    at: 0,
  };
  const WORKTREE_RUN_EXECUTION_OVERRIDE_TTL_MS = 3_000;
  const resolveWorktreeRunExecutionOverride = async () => {
    if (!inWorktreeRuntime) return { allowed: false, cutoff: null };
    const now = Date.now();
    if (
      now - cachedWorktreeRunExecutionOverride.at <
      WORKTREE_RUN_EXECUTION_OVERRIDE_TTL_MS
    ) {
      return cachedWorktreeRunExecutionOverride;
    }
    try {
      const activation = resolveWorktreeRunExecutionActivation(
        await instanceSettings.getExperimental(),
        runtimeEnv.PAPERCLIP_INSTANCE_ID?.trim() || null,
      );
      const cutoff = activation.armed ? new Date(activation.cutoff) : null;
      cachedWorktreeRunExecutionOverride = {
        allowed: Boolean(
          activation.armed && cutoff && !Number.isNaN(cutoff.getTime()),
        ),
        cutoff: cutoff && !Number.isNaN(cutoff.getTime()) ? cutoff : null,
        at: now,
      };
    } catch {
      // Keep the prior (default-false) value so a settings read failure fails
      // closed to the safe suppressed state.
    }
    return cachedWorktreeRunExecutionOverride;
  };
  const getSchedulingSuppression = async () => {
    const override = await resolveWorktreeRunExecutionOverride();
    return resolveHeartbeatSchedulingSuppression(runtimeEnv, {
      allowWorktreeRunExecution: override.allowed,
    });
  };
  // Empty unless PAPERCLIP_ADAPTER_CONCURRENCY_LIMITS is set (see
  // resolveAdapterConcurrencyLimits above); an empty map disables every
  // check below at negligible cost, so this feature is a no-op by default.
  const adapterConcurrencyLimits = resolveAdapterConcurrencyLimits(runtimeEnv);
  const getWorktreeExecutionCutoff = async () => {
    const override = await resolveWorktreeRunExecutionOverride();
    return override.allowed ? override.cutoff : null;
  };

  const runLogStore = getRunLogStore();
  const traceStore = providerTraceStore(db);
  const secretsSvc = secretService(db);
  const companySkills = companySkillService(db);
  const issuesSvc = issueService(db);
  const treeControlSvc = issueTreeControlService(db);
  const executionWorkspacesSvc = executionWorkspaceService(db);
  const environmentsSvc = environmentService(db);
  const environmentRuntime =
    options.environmentRuntime ??
    environmentRuntimeService(db, {
      pluginWorkerManager: options.pluginWorkerManager,
    });
  const instructionCopies = agentInstructionWorkingCopyService(db, { environmentRuntime });
  const envOrchestrator = environmentRunOrchestrator(db, {
    pluginWorkerManager: options.pluginWorkerManager,
    environmentRuntime,
  });
  const workspaceOperationsSvc = workspaceOperationService(db);
  const liveRunExecutions = {
    has(id: string) {
      return runningProcesses.has(id) || activeRunExecutions.has(id);
    },
  };
  const budgetHooks = {
    cancelWorkForScope: cancelBudgetScopeWork,
  };
  const budgets = budgetService(db, budgetHooks);
  const recovery = recoveryService(db, {
    enqueueWakeup,
    liveRunExecutions,
    settleExplicitContinuationRetry: releaseIssueExecutionAndPromote,
    scheduleRecoveryRetry: async (runId) => {
      const [run] = await db
        .select()
        .from(heartbeatRuns)
        .where(eq(heartbeatRuns.id, runId));
      if (!run) return null;
      const agent = await getAgent(run.agentId);
      if (!agent || agent.companyId !== run.companyId) return null;
      const result = await scheduleBoundedRetryForRun(run, agent);
      return result.outcome === "scheduled" ? result.run : null;
    },
    // Mirrors scheduleBoundedRetryForRun's transient budget check: a failed
    // or interrupted run that has already consumed every bounded transient
    // attempt cannot be retried again through this lane.
    transientRetryBudgetSpent: (run) =>
      executionFailureRetryCount(run) >=
      BOUNDED_TRANSIENT_HEARTBEAT_RETRY_MAX_ATTEMPTS,
  });
  const runDispatch = createRunDispatch(db);
  const {
    scheduleBoundedRetryForRun,
    timerClaimWasFirstHeartbeat,
    scheduleInteractionContinuationInfrastructureRetryIfEligible,
    findSharedWorkspaceHolder,
    finalizeAiConnectionBusyDeferral,
    finalizeWorkspaceBusyDeferral,
    promoteDueScheduledRetries,
    retryScheduledRetryNow,
    scheduleBoundedRetry,
  } = createHeartbeatRetries(db, {
    appendRunEvent,
    escalatePlanApprovalResumeFailureNeedsAttention,
    getAgentInvokability,
    runDispatch,
    resolveSessionBeforeForWakeup,
    resolveResponsibleUserIdForRunContext,
    recordPlanApprovalResumeFailureRetry,
    setRunStatusIfRunning,
    setWakeupStatus,
    getRun,
    getAgent,
    releaseIssueExecutionAndPromote,
    finalizeAgentStatus,
    getWorktreeExecutionCutoff,
    applyRunDispatchPostCommitEffects,
  });

  const {
    sweepPendingCleanupLeases,
    markNativeOwnershipUnverified,
    prepareHotRestartShutdown,
    reconcileHotRestartAdoption,
    recoverNativeRunsAfterRestart,
    reapOrphanedRuns,
    sweepOrphanedActiveLeases,
    drainRunningRunsForShutdown,
  } = createHeartbeatRecovery(db, {
    enterShutdown: () => { shutdownInProgress = true; },
    scheduleBoundedRetryForRun,
    appendRunEvent,
    environmentRuntime,
    scheduleNativeSessionResumeDispatch,
    getRun,
    executeRun,
    activeRunExecutionPromises,
    cancelHeartbeatNativeRun,
    terminateHeartbeatRunProcess,
    setRunStatusIfRunning,
    mergeRunStopMetadataForAgent,
    setWakeupStatus,
    classifyAndPersistRunLiveness,
    releaseEnvironmentLeasesForRun,
    releaseIssueExecutionAndPromote,
    finalizeAgentStatus,
    timerClaimWasFirstHeartbeat,
    environmentsSvc,
    acknowledgeRemoteStop,
    resumeRemoteStopComments,
    setRunStatusFromLive,
    instructionCopies,
    dispatchPendingNativeStatusWakeups,
    runtimeEnv,
    cancelRunInternal,
    activeRunExecutions,
    setRunStatus,
    getAgent,
    scheduleInteractionContinuationInfrastructureRetryIfEligible,
    startNextQueuedRunForAgent,
  });

  // Applies the post-commit effects a run-dispatch operation returns, on a
  // best-effort basis, exactly as this service publishes them for every
  // other run write. A publish failure never rolls back the write that
  // already committed.
  function applyRunDispatchPostCommitEffects(effects: PostCommitEffect[]) {
    for (const effect of effects) {
      if (effect.kind === "run_queued") {
        publishLiveEvent({
          companyId: effect.companyId,
          type: "heartbeat.run.queued",
          payload: {
            runId: effect.runId,
            agentId: effect.agentId,
            invocationSource: effect.invocationSource,
            triggerDetail: effect.triggerDetail,
            wakeupRequestId: effect.wakeupRequestId,
          },
        });
      } else {
        publishLiveEvent({
          companyId: effect.companyId,
          type: "heartbeat.run.status",
          payload: buildHeartbeatRunStatusLiveEventPayload({
            id: effect.runId,
            agentId: effect.agentId,
            status: effect.status,
            invocationSource: effect.invocationSource,
            triggerDetail: effect.triggerDetail,
            error: effect.error,
            errorCode: effect.errorCode,
            startedAt: effect.startedAt,
            finishedAt: effect.finishedAt,
            resultJson: effect.result,
            contextSnapshot: { source: effect.contextSource },
          }),
        });
        publishRunLifecyclePluginEventData(effect);
        if (
          isHeartbeatRunTerminalStatus(effect.status) &&
          effect.previousStatus !== effect.status
        ) {
          clearHeartbeatRunRuntimeStatus(effect.runId);
          void emitAgentTaskRunById(db, {
            runId: effect.runId,
            companyId: effect.companyId,
          });
        }
      }
    }
  }

  // The wake-queue module's plain snapshots hold only the fields the release
  // decision needs; escalation needs the full row, so this re-reads both by
  // id after the release transaction has committed. Returns null when either
  // row is gone, so both escalation adapters below skip the escalation call.
  async function loadStrandedEscalationRows(input: {
    issue: WakeQueueIssueSnapshot;
    latestRun: WakeQueueRunSnapshot;
  }) {
    const [issueRow] = await db
      .select()
      .from(issues)
      .where(and(eq(issues.id, input.issue.id), eq(issues.companyId, input.issue.companyId)));
    const [runRow] = await db
      .select()
      .from(heartbeatRuns)
      .where(and(eq(heartbeatRuns.id, input.latestRun.id), eq(heartbeatRuns.companyId, input.latestRun.companyId)));
    if (!issueRow || !runRow) return null;
    return { issueRow, runRow };
  }

  // Reproduces `adapters/postgres.ts`'s former `buildBlockedRecoveryNotice`
  // four-arm switch, now built once here from the full run row this file
  // already re-reads through `loadStrandedEscalationRows`.
  function buildStrandedRecoveryNoticeForKind(
    noticeKind: ReleaseRecoveryBlockedNoticeKind,
    input: { issueStatus: "todo" | "in_progress"; runRow: typeof heartbeatRuns.$inferSelect },
  ): {
    notice: StrandedRecoveryNoticeSeed;
    recoveryCause:
      | typeof WORKSPACE_VALIDATION_RECOVERY_CAUSE
      | typeof CONFIGURATION_INCOMPLETE_RECOVERY_CAUSE
      | typeof EXECUTION_REVIEW_PARTICIPANT_RECOVERY_CAUSE
      | undefined;
  } {
    if (noticeKind === "workspace_validation") {
      return { notice: buildWorkspaceValidationRecoveryNoticeSeed(), recoveryCause: WORKSPACE_VALIDATION_RECOVERY_CAUSE };
    }
    if (noticeKind === "configuration_incomplete") {
      const configurationIncomplete = parseObject(parseObject(input.runRow.resultJson).configurationIncomplete);
      return {
        notice: buildConfigurationIncompleteRecoveryNoticeSeed(
          Object.keys(configurationIncomplete).length > 0 ? configurationIncomplete : null,
        ),
        recoveryCause: CONFIGURATION_INCOMPLETE_RECOVERY_CAUSE,
      };
    }
    if (noticeKind === "execution_review_participant") {
      return {
        notice: buildExecutionReviewParticipantRecoveryNoticeSeed(),
        recoveryCause: EXECUTION_REVIEW_PARTICIPANT_RECOVERY_CAUSE,
      };
    }
    return { notice: buildImmediateExecutionPathRecoveryNoticeSeed({ status: input.issueStatus }), recoveryCause: undefined };
  }

  const wakeQueue = createWakeQueue(db, {
    resolveResponsibleUserId: async (input) => {
      // `input.issue` is the wake-queue module's own transaction-scoped
      // snapshot; using it here, instead of re-reading the issue through
      // `getIssueExecutionContext`, keeps this read off a second connection
      // while the module's transaction is open, and keeps it seeing the
      // in-transaction issue status rather than a stale one.
      return resolveResponsibleUserIdForRunSeed({
        companyId: input.companyId,
        contextSnapshot: input.contextSnapshot,
        issueContext: input.issue,
        // The wake-queue module's port type widens `env` to `unknown` so its
        // application layer stays free of this file's routine env type; the
        // value always comes from this file's own getRoutineEnvForExecutionIssue.
        routineEnvContext: input.routineEnvContext as Awaited<
          ReturnType<typeof getRoutineEnvForExecutionIssue>
        >,
        requestedByActorType: input.requestedByActorType,
        requestedByActorId: input.requestedByActorId,
        source: input.source as WakeupOptions["source"],
        triggerDetail: input.triggerDetail as WakeupOptions["triggerDetail"],
        existingRunResponsibleUserId: input.existingRunResponsibleUserId,
      });
    },
    getRoutineEnv: async (input) => {
      // Same reason as `resolveResponsibleUserId` above: use the passed-in
      // transaction-scoped issue snapshot instead of reading the issue again.
      return getRoutineEnvForExecutionIssue(input.companyId, input.issue);
    },
    resolveSessionBeforeForWakeup: async (input) => {
      // Scoped to this port only, so a wake-queue agent id can never resolve
      // a session against another company's agent row. The shared `getAgent`
      // helper below has no company predicate, so this reads the agent
      // directly with the company named in its own `WHERE` clause.
      const agent = await db
        .select()
        .from(agents)
        .where(and(eq(agents.id, input.agentId), eq(agents.companyId, input.companyId)))
        .then((rows) => rows[0] ?? null);
      if (!agent) return null;
      return resolveSessionBeforeForWakeup(agent, input.taskKey);
    },
    // These four helpers stay in this file today; the wake-queue module
    // receives them here so it never imports this file, the service it is
    // extracted from.
    wakeAdmissionHelpers: {
      filterZombieCoalesceTarget,
      mergeCoalescedContextSnapshot,
      shouldDeferFollowupWakeForSameIssue,
      shouldQueueFollowupForRunningIssueWake,
    },
    recovery: {
      escalateStrandedAssignedIssue: async (input) => {
        const rows = await loadStrandedEscalationRows(input);
        if (!rows) return;
        const { notice, recoveryCause } = buildStrandedRecoveryNoticeForKind(input.noticeKind, {
          issueStatus: input.issue.status === "todo" ? "todo" : "in_progress",
          runRow: rows.runRow,
        });
        await recovery.escalateStrandedAssignedIssue({
          issue: rows.issueRow,
          previousStatus: input.previousStatus,
          latestRun: rows.runRow,
          notice,
          recoveryCause,
        });
      },
      escalateStrandedRecoveryIssueInPlace: async (input) => {
        const rows = await loadStrandedEscalationRows(input);
        if (!rows) return;
        await recovery.escalateStrandedRecoveryIssueInPlace({
          issue: rows.issueRow,
          previousStatus: input.previousStatus,
          latestRun: rows.runRow,
        });
      },
    },
  });

  const heartbeatQueue = createHeartbeatQueue(db, {
    applyWakeQueuePostCommitEffects,
    setRunStatus,
    setWakeupStatus,
    appendRunEvent,
    releaseIssueExecutionAndPromote,
    issuesSvc,
    options,
    publishRunLifecyclePluginEvent,
    finalizeAgentStatus,
    getAgent,
    cancelRunInternal,
    toAgentOrgRow,
    getAgentInvokability,
    budgets,
    activeRunExecutions,
    treeControlSvc,
    runDispatch,
    applyRunDispatchPostCommitEffects,
    resolveResponsibleUserIdForRun,
    getIssueExecutionContext,
    isHeartbeatRunTerminalStatus,
    liveRunExecutions,
    getSchedulingSuppression,
    resumeExecutionWaitComments,
    getWorktreeExecutionCutoff,
    resumeQueuedCommentInterrupt,
    resumeSavedLegacyComments,
    cancelActiveForAgentInternal,
    listCompanyAgentOrgRows,
    executeRun,
    activeRunExecutionPromises,
    activeWakeupPromises,
    instanceSettings,
    getRun,
    sweepPendingCleanupLeases,
    resolveExplicitResumeSessionOverride,
    resolveSessionBeforeForWakeup,
    hasResolvablePriorSessionWorkspaceForWake,
    getRoutineEnvForExecutionIssue,
    resolveResponsibleUserIdForRunSeed,
    formatIssueIdentifierLink,
    wakeQueue,
    isSameTaskScope,
    runTaskKey,
    filterZombieCoalesceTarget,
  });

  const {
    countRunningRunsForAgent,
    releaseRunClaimedJustBeforeSuppression,
    claimQueuedRun,
    withChatControlRecoveryGate,
    trackWakeup,
    resumeQueuedRuns,
    parseHeartbeatPolicy,
    claimDueTimerHeartbeat,
  } = heartbeatQueue;

  // Earlier factories capture these callbacks before queue construction.
  function enqueueWakeup(...args: Parameters<typeof heartbeatQueue.enqueueWakeup>) {
    return heartbeatQueue.enqueueWakeup(...args);
  }

  function startNextQueuedRunForAgent(...args: Parameters<typeof heartbeatQueue.startNextQueuedRunForAgent>) {
    return heartbeatQueue.startNextQueuedRunForAgent(...args);
  }

  function dispatchPendingNativeStatusWakeups(...args: Parameters<typeof heartbeatQueue.dispatchPendingNativeStatusWakeups>) {
    return heartbeatQueue.dispatchPendingNativeStatusWakeups(...args);
  }

  const runLifecycle = createHeartbeatLifecycle(db, {
    issuesSvc,
    recovery,
    companySkills,
    getRun,
    emitTerminalAgentTaskRun,
    getIssueExecutionContext,
    budgets,
    enqueueWakeup,
    getCurrentUserRedactionOptions,
    treeControlSvc,
    getAgentInvokability,
    resolveSessionBeforeForWakeup,
    resolveResponsibleUserIdForRunContext,
    ensureRuntimeState,
    budgetHooks,
  });

  const {
    persistRunProcessMetadata,
    recordCurrentHeartbeatRunRuntimeProgress,
    completeSkillTestRunForHeartbeatOutcome,
    refreshContinuationSummaryForRun,
    findRunIssueComment,
    findLatestCompletedFinalAgentMessage,
    parseMaxTurnContinuationPolicy,
    finalizeIssueCommentPolicy,
    handleIssueReviewPathDisposition,
    handleRunLivenessContinuation,
    handleSuccessfulRunHandoff,
    updateRuntimeState,
    terminalizeRunOnLeaseRelease,
    clearDetachedRunWarning,
  } = runLifecycle;

  // Earlier factories capture these callbacks before lifecycle construction.
  function appendRunEvent(...args: Parameters<typeof runLifecycle.appendRunEvent>) {
    return runLifecycle.appendRunEvent(...args);
  }

  function escalatePlanApprovalResumeFailureNeedsAttention(...args: Parameters<typeof runLifecycle.escalatePlanApprovalResumeFailureNeedsAttention>) {
    return runLifecycle.escalatePlanApprovalResumeFailureNeedsAttention(...args);
  }

  function recordPlanApprovalResumeFailureRetry(...args: Parameters<typeof runLifecycle.recordPlanApprovalResumeFailureRetry>) {
    return runLifecycle.recordPlanApprovalResumeFailureRetry(...args);
  }

  function setRunStatusIfRunning(...args: Parameters<typeof runLifecycle.setRunStatusIfRunning>) {
    return runLifecycle.setRunStatusIfRunning(...args);
  }

  function setWakeupStatus(...args: Parameters<typeof runLifecycle.setWakeupStatus>) {
    return runLifecycle.setWakeupStatus(...args);
  }

  function mergeRunStopMetadataForAgent(...args: Parameters<typeof runLifecycle.mergeRunStopMetadataForAgent>) {
    return runLifecycle.mergeRunStopMetadataForAgent(...args);
  }

  function classifyAndPersistRunLiveness(...args: Parameters<typeof runLifecycle.classifyAndPersistRunLiveness>) {
    return runLifecycle.classifyAndPersistRunLiveness(...args);
  }

  function setRunStatusFromLive(...args: Parameters<typeof runLifecycle.setRunStatusFromLive>) {
    return runLifecycle.setRunStatusFromLive(...args);
  }

  function setRunStatus(...args: Parameters<typeof runLifecycle.setRunStatus>) {
    return runLifecycle.setRunStatus(...args);
  }

  function publishRunLifecyclePluginEventData(...args: Parameters<typeof runLifecycle.publishRunLifecyclePluginEventData>) {
    return runLifecycle.publishRunLifecyclePluginEventData(...args);
  }

  function publishRunLifecyclePluginEvent(...args: Parameters<typeof runLifecycle.publishRunLifecyclePluginEvent>) {
    return runLifecycle.publishRunLifecyclePluginEvent(...args);
  }

  const runControl = createHeartbeatRunControl(db, {
    getRun,
    options,
    envOrchestrator,
    activeRunExecutions,
    enqueueWakeup,
    getAgent,
    sweepPendingCleanupLeases,
    getSchedulingSuppression,
    wakeQueue,
    applyWakeQueuePostCommitEffects,
    processRunCancellationSettlements,
    mergeRunStopMetadataForAgent,
    setRunStatusFromLive,
    failedProcessRunCancellations,
    setWakeupStatus,
    appendRunEvent,
    finalizeAgentStatus,
    timerClaimWasFirstHeartbeat,
    startNextQueuedRunForAgent,
    setRunStatus,
  });

  const {
    cancelInvocationsForAgentsInternal,
  } = runControl;

  // Earlier factories capture these callbacks before run-control construction.
  function cancelBudgetScopeWork(...args: Parameters<typeof runControl.cancelBudgetScopeWork>) {
    return runControl.cancelBudgetScopeWork(...args);
  }

  function releaseIssueExecutionAndPromote(...args: Parameters<typeof runControl.releaseIssueExecutionAndPromote>) {
    return runControl.releaseIssueExecutionAndPromote(...args);
  }

  function releaseEnvironmentLeasesForRun(...args: Parameters<typeof runControl.releaseEnvironmentLeasesForRun>) {
    return runControl.releaseEnvironmentLeasesForRun(...args);
  }

  function acknowledgeRemoteStop(...args: Parameters<typeof runControl.acknowledgeRemoteStop>) {
    return runControl.acknowledgeRemoteStop(...args);
  }

  function resumeRemoteStopComments(...args: Parameters<typeof runControl.resumeRemoteStopComments>) {
    return runControl.resumeRemoteStopComments(...args);
  }

  function cancelRunInternal(...args: Parameters<typeof runControl.cancelRunInternal>) {
    return runControl.cancelRunInternal(...args);
  }

  function resumeExecutionWaitComments(...args: Parameters<typeof runControl.resumeExecutionWaitComments>) {
    return runControl.resumeExecutionWaitComments(...args);
  }

  function resumeQueuedCommentInterrupt(...args: Parameters<typeof runControl.resumeQueuedCommentInterrupt>) {
    return runControl.resumeQueuedCommentInterrupt(...args);
  }

  function resumeSavedLegacyComments(...args: Parameters<typeof runControl.resumeSavedLegacyComments>) {
    return runControl.resumeSavedLegacyComments(...args);
  }

  function cancelActiveForAgentInternal(...args: Parameters<typeof runControl.cancelActiveForAgentInternal>) {
    return runControl.cancelActiveForAgentInternal(...args);
  }

  // Applies the post-commit effects a wake-queue release returns, exactly as
  // the original release function did before its writes moved into that
  // module: publish + dispatch a promoted or recovery run, log a reopened
  // issue's activity entry.
  async function applyWakeQueuePostCommitEffects(effects: WakeQueuePostCommitEffect[]) {
    for (const effect of effects) {
      if (effect.kind === "conversation_retry_requested") {
        const [source] = await db.select().from(heartbeatRuns).where(and(
          eq(heartbeatRuns.companyId, effect.companyId), eq(heartbeatRuns.id, effect.runId),
        ));
        const agent = source ? await getAgent(source.agentId) : null;
        if (source && agent && agent.companyId === source.companyId) {
          const retry = await scheduleBoundedRetryForRun(source, agent, effect.reviewParticipant ? {
            retryReason: EXECUTION_REVIEW_PARTICIPANT_RECOVERY_RETRY_REASON,
            wakeReason: EXECUTION_REVIEW_PARTICIPANT_RECOVERY_WAKE_REASON,
          } : undefined);
          const issueId = readNonEmptyString(source.contextSnapshot?.issueId);
          if (retry.outcome !== "scheduled" && source.contextSnapshot?.explicitUserContinuation && issueId &&
              !adapterExecutionControls.has(source.id) && !(await getExecutionBlocker(db, source.companyId, issueId))) {
            // Cleanup has settled, so exhaustion or revoked/missing authority
            // must not retain a terminal claim. Do not request another retry.
            const settled = await wakeQueue.releaseIssueExecution({ companyId: source.companyId,
              runId: source.id, now: new Date(), suppressImmediateRecovery: true });
            await applyWakeQueuePostCommitEffects(settled.postCommitEffects);
          }
        }
      } else if (effect.kind === "run_queued") {
        publishLiveEvent({
          companyId: effect.run.companyId,
          type: "heartbeat.run.queued",
          payload: {
            runId: effect.run.id,
            agentId: effect.run.agentId,
            invocationSource: effect.run.invocationSource,
            triggerDetail: effect.run.triggerDetail,
            wakeupRequestId: effect.run.wakeupRequestId,
          },
        });
        await startNextQueuedRunForAgent(effect.run.agentId);
      } else {
        await logActivity(db, {
          companyId: effect.companyId,
          actorType: "system",
          actorId: "heartbeat",
          agentId: effect.agentId,
          runId: effect.runId,
          action: "issue.updated",
          entityType: "issue",
          entityId: effect.issueId,
          details: {
            status: "todo",
            reopened: true,
            reopenedFrom: effect.reopenedFrom,
            source: "deferred_comment_wake",
            identifier: effect.identifier,
          },
        });
      }
    }
  }

  const taskWatchdogs = taskWatchdogService(db, { enqueueWakeup });
  async function getAgentInvokability(
    agent: typeof agents.$inferSelect | null | undefined,
  ) {
    return evaluateAgentInvokabilityFromDb(db, agent);
  }

  const {
    triggerIssueMonitor,
    tickTimers,
    recoverActiveSessionGoals,
    recoverPendingSessionGoalActions,
  } = createHeartbeatScheduling(db, {
    issuesSvc,
    enqueueWakeup,
    getRun,
    getAgent,
    scheduleBoundedRetryForRun,
    getSchedulingSuppression,
    getWorktreeExecutionCutoff,
    toAgentOrgRow,
    groupAgentOrgRowsByCompany,
    parseHeartbeatPolicy,
    claimDueTimerHeartbeat,
  });

  const {
    resolveReusedGitWorkspaceAnchor,
    resolveWorkspaceForRun,
  } = createHeartbeatWorkspaceResolver(db);

  // Emits agent.task_run for a run write that just reached a terminal
  // status, unless the write only re-set a status the run already had (a
  // status-preserving patch, such as a livenessReason update on a run that
  // finished earlier). Only a genuine transition into a terminal status
  // emits. The emission runs in the background: it never blocks the
  // caller's remaining lifecycle work, because emitAgentTaskRun never
  // throws (it logs and swallows its own failures).
  function emitTerminalAgentTaskRun(
    updated: typeof heartbeatRuns.$inferSelect,
    previousStatus: string | null,
    failureReport?: RunFailureReportOptions,
  ) {
    if (!isHeartbeatRunTerminalStatus(updated.status)) return;
    if (previousStatus === updated.status) return;
    clearHeartbeatRunRuntimeStatus(updated.id);
    void emitAgentTaskRun(db, updated);
    void reportRunFailure(db, updated, failureReport);
  }

  async function setRunStatus(
    runId: string,
    status: string,
    patch?: Partial<typeof heartbeatRuns.$inferInsert>,
  ) {
    const previousStatus = await db
      .select()
      .from(heartbeatRuns)
      .where(eq(heartbeatRuns.id, runId))
      .then((rows) => rows[0] ?? null);

    // Cancelling a queued run that never acquired provider execution is
    // positive bootstrap evidence. It must not hold unrelated queued messages.
    if (previousStatus && (status === "cancelled" || status === "interrupted")) {
      patch = { ...patch, resultJson: cancellationResultJson(previousStatus, status, patch?.resultJson, patch?.errorCode, patch?.error) };
    }
    if (
      status === "cancelled" &&
      previousStatus?.status === "queued" &&
      previousStatus.runtimeMode !== "native" &&
      !previousStatus.startedAt &&
      !previousStatus.processPid
    ) {
      patch = {
        ...patch,
        resultJson: {
          ...previousStatus.resultJson,
          ...patch?.resultJson,
          executionRecovery: { kind: "bootstrap", providerWorkStarted: false },
        },
      };
    }
    const updated =
      previousStatus &&
      await legacyExecutionNeedsReconciliationWithEvidence(db, {
        ...previousStatus,
        status,
        ...patch,
      })
        ? await terminalizeLegacyExecution({
            db,
            run: previousStatus,
            status,
            patch,
          })
        : await db
            .update(heartbeatRuns)
            .set({
              status,
              ...patch,
              executionStatusDeliveryId: randomUUID(),
              updatedAt: new Date(),
            })
            .where(eq(heartbeatRuns.id, runId))
            .returning()
            .then((rows) => rows[0] ?? null);

    if (updated) {
      publishLiveEvent({
        companyId: updated.companyId,
        type: "heartbeat.run.status",
        payload: buildHeartbeatRunStatusLiveEventPayload(updated),
      });
      publishRunLifecyclePluginEvent(updated);
      emitTerminalAgentTaskRun(updated, previousStatus?.status ?? null);
    }

    return updated;
  }

  async function setRunStatusIfRunning(
    runId: string,
    status: string,
    patch?: Partial<typeof heartbeatRuns.$inferInsert>,
    failureReport?: RunFailureReportOptions,
  ) {
    return setRunStatusFromLive(runId, status, ["running"], patch, failureReport);
  }

  // Move a run to a new status only when its current status is one of
  // `fromStatuses`. The compare-and-set is a single conditional update, so a
  // concurrent path can win the race. When this update matches nothing, the
  // function reads the current row and reports updated=false, so the caller can
  // keep the terminal outcome that another path already wrote.
  async function setRunStatusFromLive(
    runId: string,
    status: string,
    fromStatuses: string[],
    patch?: Partial<typeof heartbeatRuns.$inferInsert>,
    failureReport?: RunFailureReportOptions,
  ) {
    // fromStatuses can name a terminal status as its own source (for example,
    // an idempotent "still failed" patch), so the write below is not always a
    // genuine transition. Read the pre-write status to tell the two apart.
    const previousStatus = await db
      .select()
      .from(heartbeatRuns)
      .where(eq(heartbeatRuns.id, runId))
      .then((rows) => rows[0] ?? null);

    if (previousStatus && (status === "cancelled" || status === "interrupted")) {
      patch = { ...patch, resultJson: cancellationResultJson(previousStatus, status, patch?.resultJson, patch?.errorCode, patch?.error) };
    }

    // Cancelling a queued run that never acquired provider execution is
    // positive bootstrap evidence. It must not hold unrelated queued messages.
    if (
      status === "cancelled" &&
      previousStatus?.status === "queued" &&
      previousStatus.runtimeMode !== "native" &&
      !previousStatus.startedAt &&
      !previousStatus.processPid
    ) {
      patch = {
        ...patch,
        resultJson: {
          ...previousStatus.resultJson,
          ...patch?.resultJson,
          executionRecovery: { kind: "bootstrap", providerWorkStarted: false },
        },
      };
    }
    const updated =
      previousStatus &&
      await legacyExecutionNeedsReconciliationWithEvidence(db, {
        ...previousStatus,
        status,
        ...patch,
      })
        ? await terminalizeLegacyExecution({
            db,
            run: previousStatus,
            status,
            patch,
            fromStatuses,
          })
        : await db
            .update(heartbeatRuns)
            .set({
              status,
              ...patch,
              executionStatusDeliveryId: randomUUID(),
              updatedAt: new Date(),
            })
            .where(
              and(
                eq(heartbeatRuns.id, runId),
                inArray(heartbeatRuns.status, fromStatuses),
                ...(isHeartbeatRunTerminalStatus(status)
                  ? [nativeRunnerOwnershipNotHeldCondition()]
                  : []),
              ),
            )
            .returning()
            .then((rows) => rows[0] ?? null);

    if (updated) {
      publishLiveEvent({
        companyId: updated.companyId,
        type: "heartbeat.run.status",
        payload: buildHeartbeatRunStatusLiveEventPayload(updated),
      });
      publishRunLifecyclePluginEvent(updated);
      emitTerminalAgentTaskRun(updated, previousStatus?.status ?? null, failureReport);
      return { run: updated, updated: true as const };
    }

    const current = await db
      .select()
      .from(heartbeatRuns)
      .where(eq(heartbeatRuns.id, runId))
      .then((rows) => rows[0] ?? null);

    return { run: current, updated: false as const };
  }

  // Invariant: when a run releases its environment lease, the run row must be
  // terminal. The finalizer writes the terminal status in a step that is
  // separate from the agent status=done PATCH. If the sandbox or the run
  // process stops between the two steps, heartbeat_runs.status stays "running".
  // The UI reads liveness from that row, so a finished task shows "Live"
  // forever. This function closes the gap in the run teardown: when the run is
  // still running or queued, it forces a terminal status before the lease is
  // released. It never overwrites a status that another path already made
  // terminal.
  async function terminalizeRunOnLeaseRelease(
    run: typeof heartbeatRuns.$inferSelect,
  ): Promise<typeof heartbeatRuns.$inferSelect> {
    if (isNativeRunnerOwnershipHeld(run)) return run;
    if (isHeartbeatRunTerminalStatus(run.status)) return run;
    if (run.status !== "running" && run.status !== "queued") return run;

    // Choose the terminal status that reflects the true outcome. When the issue
    // already reached a terminal status, the run reached its goal, so use the
    // matching terminal run status. Otherwise the teardown cut the run short,
    // so use "interrupted".
    const issueId = readNonEmptyString(
      parseObject(run.contextSnapshot).issueId,
    );
    let terminalStatus: "succeeded" | "cancelled" | "interrupted" =
      "interrupted";
    if (issueId) {
      const issueStatus = await db
        .select({ status: issues.status })
        .from(issues)
        .where(eq(issues.id, issueId))
        .then((rows) => rows[0]?.status ?? null);
      if (issueStatus === "done") terminalStatus = "succeeded";
      else if (issueStatus === "cancelled") terminalStatus = "cancelled";
    }

    // Teardown can beat the cancellation finalizer. Preserve the acknowledged
    // user intent instead of reporting an infrastructure interruption.
    if (hasAcknowledgedNativeStopIntent(run) || hasAcknowledgedNativeReassignmentStopIntent(run)) terminalStatus = "cancelled";

    const message = `run terminalized on environment lease release: heartbeat_runs.status was still ${run.status} at teardown`;
    // Match both "running" and "queued". A queued run has released its lease but
    // never reached "running", so a running-only update would miss it and leave
    // a phantom live run behind.
    const write = await setRunStatusFromLive(
      run.id,
      terminalStatus,
      ["running", "queued"],
      {
        finishedAt: run.finishedAt ?? new Date(),
        error: run.error ?? (terminalStatus === "interrupted" ? message : null),
        errorCode:
          run.errorCode ??
          (terminalStatus === "interrupted"
            ? "lease_released_before_terminal"
            : null),
      },
    );
    if (!write.updated) {
      // Another path already finalized the run. Keep that terminal outcome.
      return write.run ?? run;
    }

    const terminalRun = write.run;
    if (terminalRun) {
      await appendRunEvent(terminalRun, {
        eventType: "lifecycle",
        stream: "system",
        level: terminalStatus === "interrupted" ? "warn" : "info",
        message,
        payload: {
          previousStatus: run.status,
          terminalStatus,
          reason: "environment_lease_release",
          ...(issueId ? { issueId } : {}),
        },
      }).catch((eventErr) => {
        logger.warn(
          { err: eventErr, runId: run.id },
          "failed to append run event for lease-release terminalization",
        );
      });
    }
    return terminalRun ?? run;
  }

  function publishRunLifecyclePluginEvent(
    run: typeof heartbeatRuns.$inferSelect,
  ) {
    publishRunLifecyclePluginEventData({
      companyId: run.companyId,
      runId: run.id,
      agentId: run.agentId,
      status: run.status,
      invocationSource: run.invocationSource,
      triggerDetail: run.triggerDetail,
      error: run.error,
      errorCode: run.errorCode,
      issueId: readNonEmptyString(parseObject(run.contextSnapshot).issueId),
      startedAt: run.startedAt,
      finishedAt: run.finishedAt,
    });
  }

  function publishRunLifecyclePluginEventData(run: {
    companyId: string;
    runId: string;
    agentId: string;
    status: string;
    invocationSource: string;
    triggerDetail: string | null;
    error: string | null;
    errorCode: string | null;
    issueId: string | null;
    startedAt: Date | null;
    finishedAt: Date | null;
  }) {
    const eventType =
      run.status === "running"
        ? "agent.run.started"
        : run.status === "succeeded"
          ? "agent.run.finished"
          : run.status === "failed" || run.status === "timed_out"
            ? "agent.run.failed"
            : run.status === "cancelled"
              ? "agent.run.cancelled"
              : null;
    if (!eventType) return;
    publishPluginDomainEvent({
      eventId: randomUUID(),
      eventType,
      occurredAt: new Date().toISOString(),
      actorId: run.agentId,
      actorType: "agent",
      entityId: run.runId,
      entityType: "heartbeat_run",
      companyId: run.companyId,
      payload: {
        runId: run.runId,
        agentId: run.agentId,
        status: run.status,
        invocationSource: run.invocationSource,
        triggerDetail: run.triggerDetail,
        error: run.error ?? null,
        errorCode: run.errorCode ?? null,
        issueId: run.issueId,
        startedAt: run.startedAt ? new Date(run.startedAt).toISOString() : null,
        finishedAt: run.finishedAt
          ? new Date(run.finishedAt).toISOString()
          : null,
      },
    });
  }

  async function setWakeupStatus(
    wakeupRequestId: string | null | undefined,
    status: string,
    patch?: Partial<typeof agentWakeupRequests.$inferInsert>,
  ) {
    if (!wakeupRequestId) return;
    await db
      .update(agentWakeupRequests)
      .set({ status, ...patch, updatedAt: new Date() })
      // Reassignment revokes requests transactionally. Late execution settlement
      // must not turn a revoked request back into authority for a later retry.
      .where(and(eq(agentWakeupRequests.id, wakeupRequestId), ne(agentWakeupRequests.status, "cancelled")));
  }

  async function addContinuationExhaustedCommentOnce(input: {
    run: typeof heartbeatRuns.$inferSelect;
    issueId: string;
    comment: string;
  }) {
    const existing = await db
      .select({ id: issueComments.id })
      .from(issueComments)
      .where(
        and(
          eq(issueComments.companyId, input.run.companyId),
          eq(issueComments.issueId, input.issueId),
          eq(issueComments.createdByRunId, input.run.id),
          sql`${issueComments.body} like 'Bounded liveness continuation exhausted%'`,
        ),
      )
      .limit(1)
      .then((rows) => rows[0] ?? null);
    if (existing) return;
    await issuesSvc.addComment(input.issueId, input.comment, {
      agentId: input.run.agentId,
      runId: input.run.id,
    });
  }

  async function handleRunLivenessContinuation(
    run: typeof heartbeatRuns.$inferSelect,
  ) {
    const context = parseObject(run.contextSnapshot);
    if (
      readNonEmptyString(context.goalControlRequestId) ||
      context.resumeSessionGoalHeartbeat === true
    )
      return;
    const livenessState = run.livenessState as RunLivenessState | null;
    if (livenessState !== "plan_only" && livenessState !== "empty_response")
      return;

    const issueId = readNonEmptyString(context.issueId);
    if (!issueId) return;
    const waitingContext = await getIssueExecutionContext(run.companyId, issueId);
    if (isWaitingConversation(waitingContext) || waitingContext?.externalConversationState === "waiting") return;

    const [issue, agent] = await Promise.all([
      db
        .select({
          id: issues.id,
          companyId: issues.companyId,
          identifier: issues.identifier,
          title: issues.title,
          status: issues.status,
          assigneeAgentId: issues.assigneeAgentId,
          executionState: issues.executionState,
          projectId: issues.projectId,
        })
        .from(issues)
        .where(and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)))
        .then((rows) => rows[0] ?? null),
      db
        .select({
          id: agents.id,
          companyId: agents.companyId,
          status: agents.status,
        })
        .from(agents)
        .where(eq(agents.id, run.agentId))
        .then((rows) => rows[0] ?? null),
    ]);

    const budgetBlock =
      issue && agent
        ? await budgets.getInvocationBlock(issue.companyId, agent.id, {
            issueId: issue.id,
            projectId: issue.projectId,
          })
        : null;

    const nextAttempt = readContinuationAttempt(run.continuationAttempt) + 1;
    const idempotencyKey = issue
      ? buildRunLivenessContinuationIdempotencyKey({
          issueId: issue.id,
          sourceRunId: run.id,
          livenessState,
          nextAttempt,
        })
      : null;
    const existingWake = idempotencyKey
      ? await findExistingRunLivenessContinuationWake(db, {
          companyId: run.companyId,
          idempotencyKey,
        })
      : null;

    const decision = decideRunLivenessContinuation({
      run,
      issue,
      agent,
      livenessState,
      livenessReason: run.livenessReason,
      nextAction: run.nextAction,
      budgetBlocked: Boolean(budgetBlock),
      idempotentWakeExists: Boolean(existingWake),
    });

    if (decision.kind === "exhausted") {
      await setRunStatus(run.id, run.status, {
        livenessReason: `${run.livenessReason ?? "Run ended without concrete progress"}; continuation attempts exhausted`,
      });
      await addContinuationExhaustedCommentOnce({
        run,
        issueId,
        comment: decision.comment,
      });
      return;
    }

    if (decision.kind !== "enqueue") return;

    const continuationRun = await enqueueWakeup(run.agentId, {
      source: "automation",
      triggerDetail: "system",
      reason: RUN_LIVENESS_CONTINUATION_REASON,
      payload: decision.payload,
      contextSnapshot: {
        ...decision.contextSnapshot,
        originIdentityContextId: null,
        parentRunId: run.id,
      },
      idempotencyKey: decision.idempotencyKey,
      requestedByActorType: "system",
      requestedByActorId: "heartbeat",
    });

    if (continuationRun) {
      await db
        .update(heartbeatRuns)
        .set({
          continuationAttempt: decision.nextAttempt,
          updatedAt: new Date(),
        })
        .where(eq(heartbeatRuns.id, run.id));
    }
  }

  function issueUiLink(
    issue: Pick<typeof issues.$inferSelect, "id" | "identifier">,
  ) {
    const label = issue.identifier ?? issue.id;
    const prefix = issue.identifier?.split("-")[0] || "PAP";
    return `[${label}](/${prefix}/issues/${label})`;
  }

  function hasUnmanagedBackgroundTaskEvidence(
    resultJson: Record<string, unknown> | null | undefined,
  ) {
    const evidence = parseObject(resultJson?.unmanagedBackgroundTask);
    return (
      evidence.stopped === true &&
      (evidence.stopReason === UNMANAGED_BACKGROUND_TASK_STOP_REASON ||
        evidence.reason === UNMANAGED_BACKGROUND_TASK_LIVENESS_REASON)
    );
  }

  function withUnmanagedBackgroundTaskStopReason(
    resultJson: Record<string, unknown> | null | undefined,
  ) {
    return {
      ...(resultJson ?? {}),
      stopReason: UNMANAGED_BACKGROUND_TASK_STOP_REASON,
    };
  }

  function buildDetectedSuccessfulRunProgressSummary(
    run: typeof heartbeatRuns.$inferSelect,
    currentUserRedactionOptions: CurrentUserRedactionOptions,
  ) {
    const resultJson = parseObject(run.resultJson);
    const candidates = [
      hasUnmanagedBackgroundTaskEvidence(resultJson)
        ? UNMANAGED_BACKGROUND_TASK_LIVENESS_REASON
        : null,
      readNonEmptyString(run.nextAction)
        ? `Next action noted: ${readNonEmptyString(run.nextAction)}`
        : null,
      readNonEmptyString(run.livenessReason),
      readNonEmptyString(resultJson.summary),
      readNonEmptyString(resultJson.result),
      readNonEmptyString(resultJson.message),
    ].filter((value): value is string => Boolean(value));
    const summary = candidates[0];
    if (!summary) return null;
    return redactDetectedSuccessfulRunProgressSummaryForBoard(
      summary,
      currentUserRedactionOptions,
    );
  }

  async function addSuccessfulRunHandoffCommentOnce(input: {
    issue: Pick<
      typeof issues.$inferSelect,
      "id" | "identifier" | "title" | "status"
    >;
    run: typeof heartbeatRuns.$inferSelect;
    agent: Pick<typeof agents.$inferSelect, "id" | "name">;
    detectedProgressSummary: string;
  }) {
    const existing = await db
      .select({ id: issueComments.id })
      .from(issueComments)
      .where(
        and(
          eq(issueComments.companyId, input.run.companyId),
          eq(issueComments.issueId, input.issue.id),
          eq(issueComments.createdByRunId, input.run.id),
          sql`(${issueComments.body} = ${SUCCESSFUL_RUN_HANDOFF_REQUIRED_NOTICE_BODY} or ${issueComments.body} like '## This issue still needs a next step%' or ${issueComments.body} like '## Successful run missing issue disposition%')`,
        ),
      )
      .limit(1)
      .then((rows) => rows[0] ?? null);
    if (existing) return null;
    const notice = buildSuccessfulRunHandoffRequiredNotice(input);
    return issuesSvc.addComment(
      input.issue.id,
      notice.body,
      { runId: input.run.id },
      {
        authorType: "system",
        presentation: notice.presentation,
        metadata: notice.metadata,
      },
    );
  }

  async function handleSuccessfulRunHandoff(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
  ) {
    if (run.status !== "succeeded") return;
    const context = parseObject(run.contextSnapshot);
    const issueId =
      readNonEmptyString(context.issueId) ?? readNonEmptyString(context.taskId);
    if (!issueId) return;
    const waitingContext = await getIssueExecutionContext(run.companyId, issueId);
    if (isWaitingConversation(waitingContext) || waitingContext?.externalConversationState === "waiting") return;
    if (
      readNonEmptyString(context.goalControlRequestId) ||
      context.resumeSessionGoalHeartbeat === true
    ) {
      const goalProjection = await runnerGoalService(db).projection(
        run.companyId,
        issueId,
        run.agentId,
      );
      if (goalProjection?.goal?.status !== "complete") return;
    }

    const issue = await db
      .select({
        id: issues.id,
        companyId: issues.companyId,
        identifier: issues.identifier,
        title: issues.title,
        description: issues.description,
        status: issues.status,
        assigneeAgentId: issues.assigneeAgentId,
        assigneeUserId: issues.assigneeUserId,
        executionState: issues.executionState,
        monitorNextCheckAt: issues.monitorNextCheckAt,
        projectId: issues.projectId,
        originKind: issues.originKind,
      })
      .from(issues)
      .where(and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)))
      .then((rows) => rows[0] ?? null);
    const idempotencyKey = issue
      ? buildFinishSuccessfulRunHandoffIdempotencyKey({
          issueId: issue.id,
          sourceRunId: run.id,
        })
      : null;
    const taskKey = deriveTaskKeyWithHeartbeatFallback(context, null);
    const currentUserRedactionOptions = await getCurrentUserRedactionOptions();
    const detectedProgressSummary = buildDetectedSuccessfulRunProgressSummary(
      run,
      currentUserRedactionOptions,
    );
    const resultJson = parseObject(run.resultJson);
    const finalReport = redactSuccessfulRunHandoffEvidence(
      [
        readNonEmptyString(resultJson.summary),
        readNonEmptyString(resultJson.result),
        readNonEmptyString(resultJson.message),
      ].find((value): value is string => Boolean(value)) ?? null,
      currentUserRedactionOptions,
    );
    const nextAction = redactSuccessfulRunHandoffEvidence(
      readNonEmptyString(run.nextAction),
      currentUserRedactionOptions,
    );

    const [
      activeExecutionPath,
      queuedWake,
      pendingInteraction,
      pendingApproval,
      explicitBlocker,
      openRecoveryIssue,
      existingWake,
      budgetBlock,
      pauseHold,
      activeRoutineContinuation,
    ] = await Promise.all([
      issue
        ? db
            .select({ id: heartbeatRuns.id })
            .from(heartbeatRuns)
            .where(
              and(
                eq(heartbeatRuns.companyId, issue.companyId),
                eq(heartbeatRuns.agentId, run.agentId),
                inArray(heartbeatRuns.status, [
                  ...EXECUTION_PATH_HEARTBEAT_RUN_STATUSES,
                ]),
                sql`(
                ${heartbeatRuns.contextSnapshot} ->> 'issueId' = ${issue.id}
                or ${heartbeatRuns.contextSnapshot} ->> 'taskId' = ${issue.id}
              )`,
                sql`${heartbeatRuns.id} <> ${run.id}`,
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: agentWakeupRequests.id })
            .from(agentWakeupRequests)
            .where(
              and(
                eq(agentWakeupRequests.companyId, issue.companyId),
                eq(agentWakeupRequests.agentId, run.agentId),
                inArray(agentWakeupRequests.status, [
                  "queued",
                  "deferred_issue_execution",
                  "claimed",
                ]),
                sql`(
                ${agentWakeupRequests.payload} ->> 'issueId' = ${issue.id}
                or ${agentWakeupRequests.payload} ->> 'taskId' = ${issue.id}
                or ${agentWakeupRequests.payload} -> '_paperclipWakeContext' ->> 'issueId' = ${issue.id}
                or ${agentWakeupRequests.payload} -> '_paperclipWakeContext' ->> 'taskId' = ${issue.id}
              )`,
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: issueThreadInteractions.id })
            .from(issueThreadInteractions)
            .where(
              and(
                eq(issueThreadInteractions.companyId, issue.companyId),
                eq(issueThreadInteractions.issueId, issue.id),
                eq(issueThreadInteractions.status, "pending"),
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: issueApprovals.approvalId })
            .from(issueApprovals)
            .innerJoin(approvals, eq(issueApprovals.approvalId, approvals.id))
            .where(
              and(
                eq(issueApprovals.companyId, issue.companyId),
                eq(issueApprovals.issueId, issue.id),
                inArray(approvals.status, ["pending", "revision_requested"]),
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: issueRelations.issueId })
            .from(issueRelations)
            .where(
              and(
                eq(issueRelations.companyId, issue.companyId),
                eq(issueRelations.relatedIssueId, issue.id),
                eq(issueRelations.type, "blocks"),
                sql`exists (
                select 1
                from issues blocker
                where blocker.id = ${issueRelations.issueId}
                  and blocker.company_id = ${issue.companyId}
                  and blocker.status not in ('done', 'cancelled')
                  and blocker.hidden_at is null
              )`,
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: issues.id })
            .from(issues)
            .where(
              and(
                eq(issues.companyId, issue.companyId),
                inArray(issues.originKind, [
                  RECOVERY_ORIGIN_KINDS.strandedIssueRecovery,
                  RECOVERY_ORIGIN_KINDS.issueGraphLivenessEscalation,
                ]),
                eq(issues.originId, issue.id),
                visibleIssueCondition(),
                notInArray(issues.status, ["done", "cancelled"]),
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
      idempotencyKey
        ? findExistingFinishSuccessfulRunHandoffWake(db, {
            companyId: run.companyId,
            idempotencyKey,
          })
        : Promise.resolve(null),
      issue
        ? budgets.getInvocationBlock(issue.companyId, run.agentId, {
            issueId: issue.id,
            projectId: issue.projectId,
          })
        : Promise.resolve(null),
      issue
        ? treeControlSvc.getActivePauseHoldGate(issue.companyId, issue.id)
        : Promise.resolve(null),
      issue
        ? db
            .select({ id: routines.id })
            .from(routines)
            .where(
              and(
                eq(routines.companyId, issue.companyId),
                eq(routines.parentIssueId, issue.id),
                eq(routines.status, "active"),
              ),
            )
            .limit(1)
            .then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
    ]);

    const decision = decideSuccessfulRunHandoff({
      run,
      issue,
      agent,
      livenessState: run.livenessState as RunLivenessState | null,
      detectedProgressSummary,
      finalReport,
      nextAction,
      taskKey,
      hasActiveExecutionPath: Boolean(activeExecutionPath),
      hasQueuedWake: Boolean(queuedWake),
      hasPendingInteractionOrApproval: Boolean(
        pendingInteraction || pendingApproval,
      ),
      hasPersistedMonitor: Boolean(issue?.monitorNextCheckAt),
      hasExplicitBlockerPath: Boolean(explicitBlocker),
      hasOpenRecoveryIssue: Boolean(openRecoveryIssue),
      hasPauseHold: Boolean(pauseHold),
      hasActiveRoutineContinuation: Boolean(activeRoutineContinuation),
      budgetBlocked: Boolean(budgetBlock),
      idempotentWakeExists: Boolean(existingWake),
    });

    if (isSuccessfulRunHandoffValidPathSkip(decision) && issue) {
      await resolveRequiredSuccessfulRunHandoffOnValidPath(db, {
        companyId: issue.companyId,
        issueId: issue.id,
        issueIdentifier: issue.identifier,
        agentId: run.agentId,
        runId: run.id,
        skipReason: decision.reason,
      });
    }

    if (decision.kind !== "enqueue" || !issue) return;

    if (hasUnmanagedBackgroundTaskEvidence(parseObject(run.resultJson))) {
      await db
        .update(heartbeatRuns)
        .set({
          livenessReason: UNMANAGED_BACKGROUND_TASK_LIVENESS_REASON,
          resultJson: withUnmanagedBackgroundTaskStopReason(
            parseObject(run.resultJson),
          ),
          updatedAt: new Date(),
        })
        .where(eq(heartbeatRuns.id, run.id));
    }

    const handoffRun = await enqueueWakeup(decision.targetAgentId, {
      source: "automation",
      triggerDetail: "system",
      reason: FINISH_SUCCESSFUL_RUN_HANDOFF_REASON,
      payload: decision.payload,
      contextSnapshot: {
        ...decision.contextSnapshot,
        originIdentityContextId: null,
        parentRunId: run.id,
      },
      idempotencyKey: decision.idempotencyKey,
      requestedByActorType: "system",
      requestedByActorId: "heartbeat",
    });
    if (!handoffRun) return;

    await addSuccessfulRunHandoffCommentOnce({
      issue,
      run,
      agent,
      detectedProgressSummary:
        detectedProgressSummary ??
        "The run reported progress, but did not choose a next step.",
    });
    await logActivity(db, {
      companyId: issue.companyId,
      actorType: "system",
      actorId: "heartbeat",
      agentId: run.agentId,
      runId: run.id,
      action: "issue.successful_run_handoff_required",
      entityType: "issue",
      entityId: issue.id,
      details: {
        label: "Successful run missing issue disposition",
        sourceRunId: run.id,
        correctiveRunId: handoffRun.id,
        handoffReason: SUCCESSFUL_RUN_MISSING_STATE_REASON,
        missingDisposition: "clear_next_step",
        detectedProgressSummary,
        issue: issueUiLink(issue),
      },
    });
  }

  async function handleIssueReviewPathDisposition(
    run: typeof heartbeatRuns.$inferSelect,
  ) {
    const contextSnapshot = parseObject(run.contextSnapshot);
    if (readNonEmptyString(contextSnapshot.goalControlRequestId)) return;
    const issueId =
      readNonEmptyString(contextSnapshot.issueId) ??
      readNonEmptyString(contextSnapshot.taskId);
    if (!issueId) return;
    const waitingContext = await getIssueExecutionContext(run.companyId, issueId);
    if (isWaitingConversation(waitingContext) || waitingContext?.externalConversationState === "waiting") return;

    const issue = await db
      .select({
        id: issues.id,
        companyId: issues.companyId,
        identifier: issues.identifier,
        status: issues.status,
        assigneeAgentId: issues.assigneeAgentId,
      })
      .from(issues)
      .where(and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)))
      .then((rows) => rows[0] ?? null);
    if (!issue || issue.status !== "in_review" || !issue.assigneeAgentId)
      return;

    const reviewAttention = await issuesSvc
      .listReviewAttention(issue.companyId, [issue])
      .then(
        (map) =>
          map.get(issue.id) ?? {
            state: "none" as const,
            paths: [],
            reason: null,
          },
      );
    if (reviewAttention.state !== "stalled") return;

    const consumedPathRef = reviewPathConsumedRefFromRun({
      runId: run.id,
      issueId: issue.id,
      contextSnapshot,
    });
    const idempotencyKey = buildIssueReviewPathLostIdempotencyKey({
      issueId: issue.id,
      consumedPathRef,
    });
    const existingWake = await db
      .select({ id: agentWakeupRequests.id })
      .from(agentWakeupRequests)
      .where(
        and(
          eq(agentWakeupRequests.companyId, issue.companyId),
          eq(agentWakeupRequests.idempotencyKey, idempotencyKey),
          notInArray(agentWakeupRequests.status, ["skipped"]),
        ),
      )
      .limit(1)
      .then((rows) => rows[0] ?? null);

    const decision = decideIssueReviewPathRecovery({
      issueId: issue.id,
      sourceRunId: run.id,
      assigneeAgentId: issue.assigneeAgentId,
      contextSnapshot,
      reviewAttention,
      existingWake: Boolean(existingWake),
    });
    if (decision.kind !== "enqueue") return;

    const recoveryRun = await enqueueWakeup(issue.assigneeAgentId, {
      source: "automation",
      triggerDetail: "system",
      reason: ISSUE_REVIEW_PATH_LOST_WAKE_REASON,
      idempotencyKey: decision.idempotencyKey,
      payload: decision.payload,
      contextSnapshot: decision.contextSnapshot,
      requestedByActorType: "system",
      requestedByActorId: "heartbeat",
    }).catch((error: unknown) => {
      if (isReviewPathRecoveryIdempotencyConflict(error)) return null;
      throw error;
    });
    if (!recoveryRun) return;

    await logActivity(db, {
      companyId: issue.companyId,
      actorType: "system",
      actorId: "heartbeat",
      agentId: issue.assigneeAgentId,
      runId: run.id,
      action: "issue.review_path_recovery_queued",
      entityType: "issue",
      entityId: issue.id,
      details: {
        sourceRunId: run.id,
        recoveryRunId: recoveryRun.id,
        consumedPathRef,
        recoveryAttempt: 1,
        maxRecoveryAttempts: 1,
      },
    });
  }

  async function appendRunEvent(
    run: typeof heartbeatRuns.$inferSelect,
    event: {
      eventType: string;
      stream?: "system" | "stdout" | "stderr";
      level?: "info" | "warn" | "error";
      color?: string;
      message?: string;
      payload?: Record<string, unknown>;
      retryExhaustion?: AppendHeartbeatRunEventInput["retryExhaustion"];
    },
  ) {
    const eventAt = new Date();
    const currentUserRedactionOptions = await getCurrentUserRedactionOptions();
    const sanitizedMessage = event.message
      ? redactSensitiveText(
          redactCurrentUserText(event.message, currentUserRedactionOptions),
        )
      : event.message;
    const boundedPayload = event.payload
      ? boundHeartbeatRunEventPayloadForStorage(event.payload)
      : event.payload;
    const secretSanitizedPayload = boundedPayload
      ? redactEventPayload(boundedPayload)
      : boundedPayload;
    const sanitizedPayload = secretSanitizedPayload
      ? redactCurrentUserValue(
          secretSanitizedPayload,
          currentUserRedactionOptions,
        )
      : secretSanitizedPayload;
    const issueId = readRuntimeStatusIssueIdCandidate(run) ?? null;
    const progress = buildRunEventRuntimeProgress({
      eventType: event.eventType,
      message: sanitizedMessage ?? null,
      payload: sanitizedPayload ?? null,
      at: eventAt,
    });
    const persistedEvent = await appendHeartbeatRunEvent(db, {
      companyId: run.companyId,
      runId: run.id,
      agentId: run.agentId,
      eventType: event.eventType,
      stream: event.stream,
      level: event.level,
      color: event.color,
      message: sanitizedMessage,
      payload: sanitizedPayload,
      retryExhaustion: event.retryExhaustion,
    });
    if (persistedEvent.disposition === "duplicate") return;
    const seq = persistedEvent.row.seq;

    publishLiveEvent({
      companyId: run.companyId,
      type: "heartbeat.run.event",
      payload: {
        runId: run.id,
        agentId: run.agentId,
        issueId,
        seq,
        eventType: event.eventType,
        stream: event.stream ?? null,
        level: event.level ?? null,
        color: event.color ?? null,
        message: sanitizedMessage ?? null,
        currentToolName: progress?.currentToolName ?? null,
        lastAssistantSnippet: progress?.lastAssistantSnippet ?? null,
        lastEventAt: (progress?.lastEventAt ?? eventAt).toISOString(),
        payload: sanitizedPayload ?? null,
      },
    });
    if (progress && isHeartbeatRunRuntimeStatusActive(run.status)) {
      const status = setHeartbeatRunRuntimeStatus({
        companyId: run.companyId,
        issueId,
        agentId: run.agentId,
        runId: run.id,
        phase: progress.phase,
        message: progress.message,
        updatedAt: eventAt,
        currentToolName: progress.currentToolName,
        lastAssistantSnippet: progress.lastAssistantSnippet,
        lastEventAt: progress.lastEventAt,
      });
      if (status) publishHeartbeatRunRuntimeProgress(status);
    }
  }

  async function persistRunProcessMetadata(
    runId: string,
    meta: { pid: number; processGroupId: number | null; startedAt: string },
  ) {
    return persistHeartbeatRunProcessMetadata(db, runId, meta);
  }

  async function clearDetachedRunWarning(runId: string) {
    const updated = await db
      .update(heartbeatRuns)
      .set({
        error: null,
        errorCode: null,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(heartbeatRuns.id, runId),
          eq(heartbeatRuns.status, "running"),
          eq(heartbeatRuns.errorCode, DETACHED_PROCESS_ERROR_CODE),
        ),
      )
      .returning()
      .then((rows) => rows[0] ?? null);
    if (!updated) return null;

    await appendRunEvent(updated, {
      eventType: "lifecycle",
      stream: "system",
      level: "info",
      message:
        "Detached child process reported activity; cleared detached warning",
    });
    return updated;
  }

  async function patchRunIssueCommentStatus(
    runId: string,
    patch: Partial<
      Pick<
        typeof heartbeatRuns.$inferInsert,
        | "issueCommentStatus"
        | "issueCommentSatisfiedByCommentId"
        | "issueCommentRetryQueuedAt"
      >
    >,
  ) {
    return db
      .update(heartbeatRuns)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(heartbeatRuns.id, runId))
      .returning()
      .then((rows) => rows[0] ?? null);
  }

  async function findRunIssueComment(
    runId: string,
    companyId: string,
    issueId: string,
    resultJson?: Record<string, unknown> | null,
  ) {
    const comments = await db
      .select({
        id: issueComments.id,
        body: issueComments.body,
      })
      .from(issueComments)
      .where(
        and(
          eq(issueComments.companyId, companyId),
          eq(issueComments.issueId, issueId),
          eq(issueComments.createdByRunId, runId),
        ),
      )
      .orderBy(desc(issueComments.createdAt), desc(issueComments.id));
    return findHeartbeatRunCompletionComment(comments, resultJson);
  }

  async function findLatestCompletedFinalAgentMessage(
    runId: string,
    companyId: string,
  ) {
    const rows = await db
      .select({
        seq: heartbeatRunEvents.seq,
        payload: heartbeatRunEvents.payload,
      })
      .from(heartbeatRunEvents)
      .where(
        and(
          eq(heartbeatRunEvents.companyId, companyId),
          eq(heartbeatRunEvents.runId, runId),
          eq(heartbeatRunEvents.eventType, "item.completed"),
        ),
      )
      .orderBy(desc(heartbeatRunEvents.seq))
      .limit(200);
    const candidates: Array<{
      seq: number;
      text: string;
      sourceEventId: string | null;
      channel: "final" | "unknown";
    }> = [];
    for (const row of rows) {
      const prpEvent = parseObject(parseObject(row.payload).prpEvent);
      const candidate = readCompletedAssistantMessageCandidate({
        seq: row.seq,
        prpEvent,
      });
      if (candidate) candidates.push(candidate);
    }
    const recoveryBoundary = await db
      .select({
        seq: heartbeatRunEvents.seq,
        payload: heartbeatRunEvents.payload,
      })
      .from(heartbeatRunEvents)
      .where(
        and(
          eq(heartbeatRunEvents.companyId, companyId),
          eq(heartbeatRunEvents.runId, runId),
          eq(heartbeatRunEvents.eventType, "lifecycle"),
        ),
      )
      .orderBy(heartbeatRunEvents.seq)
      .limit(200)
      .then(
        (lifecycleRows) =>
          lifecycleRows.find(
            (row) =>
              parseObject(row.payload).retryReasonCode ===
              "semantic_result_missing",
          )?.seq ?? null,
      );
    return selectHeartbeatRunFinalAgentMessage({
      candidates,
      semanticResultRecoveryAfterSeq: recoveryBoundary,
    });
  }

  async function refreshContinuationSummaryForRun(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
  ) {
    const contextSnapshot = parseObject(run.contextSnapshot);
    const issueId = readNonEmptyString(contextSnapshot.issueId);
    if (!issueId) return null;
    try {
      return await refreshIssueContinuationSummary({
        db,
        issueId,
        run: {
          id: run.id,
          status: run.status,
          error: run.error,
          errorCode: run.errorCode,
          resultJson: run.resultJson as Record<string, unknown> | null,
          stdoutExcerpt: run.stdoutExcerpt,
          stderrExcerpt: run.stderrExcerpt,
          finishedAt: run.finishedAt,
        },
        agent: {
          id: agent.id,
          name: agent.name,
          adapterType: agent.adapterType,
        },
      });
    } catch (err) {
      logger.warn(
        {
          err,
          runId: run.id,
          issueId,
          agentId: agent.id,
        },
        "failed to refresh issue continuation summary",
      );
      return null;
    }
  }

  async function enqueueMissingIssueCommentRetry(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
    issueId: string,
  ) {
    const invokability = await getAgentInvokability(agent);
    if (!invokability.invokable) {
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message:
          "Missing-comment retry suppressed because the agent is not invokable",
        payload: {
          reason: invokability.reason,
          invalidOrgChain: invokability.invalidOrgChain,
          ...invokability.details,
        },
      });
      return null;
    }

    const contextSnapshot = parseObject(run.contextSnapshot);
    const taskKey = deriveTaskKeyWithHeartbeatFallback(contextSnapshot, null);
    const sessionBefore = await resolveSessionBeforeForWakeup(agent, taskKey);
    const retryContextSnapshot = withRecoveryContext(
      {
        ...contextSnapshot,
        retryOfRunId: run.id,
        wakeReason: "missing_issue_comment",
        retryReason: "missing_issue_comment",
        missingIssueCommentForRunId: run.id,
      },
      "status_only",
    );
    const responsibleUserId = await resolveResponsibleUserIdForRunContext(
      run,
      retryContextSnapshot,
    );
    const now = new Date();

    const retryRun = await db.transaction(async (tx) => {
      await tx.execute(
        sql`select id from issues where company_id = ${run.companyId} and execution_run_id = ${run.id} for update`,
      );

      const issue = await tx
        .select({ id: issues.id })
        .from(issues)
        .where(
          and(
            eq(issues.companyId, run.companyId),
            eq(issues.executionRunId, run.id),
          ),
        )
        .then((rows) => rows[0] ?? null);
      if (!issue) return null;

      const wakeupRequest = await tx
        .insert(agentWakeupRequests)
        .values({
          companyId: run.companyId,
          agentId: run.agentId,
          source: "automation",
          triggerDetail: "system",
          reason: "missing_issue_comment",
          payload: withRecoveryContext(
            {
              issueId,
              retryOfRunId: run.id,
              retryReason: "missing_issue_comment",
            },
            "status_only",
          ),
          status: "queued",
          requestedByActorType: "system",
          requestedByActorId: null,
          updatedAt: now,
        })
        .returning()
        .then((rows) => rows[0]);

      const queuedRun = await tx
        .insert(heartbeatRuns)
        .values({
          companyId: run.companyId,
          agentId: run.agentId,
          invocationSource: "automation",
          triggerDetail: "system",
          status: "queued",
          wakeupRequestId: wakeupRequest.id,
          contextSnapshot: retryContextSnapshot,
          responsibleUserId,
          sessionIdBefore: sessionBefore,
          retryOfRunId: run.id,
          issueCommentStatus: "not_applicable",
          updatedAt: now,
        })
        .returning()
        .then((rows) => rows[0]);

      await tx
        .update(agentWakeupRequests)
        .set({
          runId: queuedRun.id,
          updatedAt: now,
        })
        .where(eq(agentWakeupRequests.id, wakeupRequest.id));

      await tx
        .update(issues)
        .set({
          executionRunId: queuedRun.id,
          executionAgentNameKey: normalizeAgentNameKey(agent.name),
          executionLockedAt: now,
          updatedAt: now,
        })
        .where(eq(issues.id, issue.id));

      await tx
        .update(heartbeatRuns)
        .set({
          issueCommentStatus: "retry_queued",
          issueCommentRetryQueuedAt: now,
          updatedAt: now,
        })
        .where(eq(heartbeatRuns.id, run.id));

      return queuedRun;
    });

    if (!retryRun) return null;

    publishLiveEvent({
      companyId: retryRun.companyId,
      type: "heartbeat.run.queued",
      payload: {
        runId: retryRun.id,
        agentId: retryRun.agentId,
        invocationSource: retryRun.invocationSource,
        triggerDetail: retryRun.triggerDetail,
        wakeupRequestId: retryRun.wakeupRequestId,
      },
    });

    return retryRun;
  }

  async function hasDeferredIssueCommentWake(
    companyId: string,
    issueId: string,
    agentId: string,
  ) {
    const deferredPayloads = await db
      .select({ payload: agentWakeupRequests.payload })
      .from(agentWakeupRequests)
      .where(
        and(
          eq(agentWakeupRequests.companyId, companyId),
          eq(agentWakeupRequests.agentId, agentId),
          eq(agentWakeupRequests.status, "deferred_issue_execution"),
          sql`${agentWakeupRequests.payload} ->> 'issueId' = ${issueId}`,
        ),
      );

    return deferredPayloads.some(({ payload }) => {
      const parsedPayload = parseObject(payload);
      const deferredContext = parseObject(
        parsedPayload[DEFERRED_WAKE_CONTEXT_KEY],
      );
      return Boolean(deriveCommentId(deferredContext, parsedPayload));
    });
  }

  async function finalizeIssueCommentPolicy(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
    presentationDecision?: RunPresentationDecision | null,
  ) {
    const contextSnapshot = parseObject(run.contextSnapshot);
    // The explicit receipt admitted one turn. A prose-only follow-up cannot
    // reuse it or renew it under the separate transient-failure retry policy.
    if (readNonEmptyString(contextSnapshot.goalControlRequestId) || contextSnapshot.explicitUserContinuation) {
      if (run.issueCommentStatus !== "not_applicable") {
        await patchRunIssueCommentStatus(run.id, {
          issueCommentStatus: "not_applicable",
          issueCommentSatisfiedByCommentId: null,
          issueCommentRetryQueuedAt: null,
        });
      }
      return { outcome: "not_applicable" as const, queuedRun: null };
    }
    const issueId = readNonEmptyString(contextSnapshot.issueId);
    if (!issueId) {
      if (run.issueCommentStatus !== "not_applicable") {
        await patchRunIssueCommentStatus(run.id, {
          issueCommentStatus: "not_applicable",
          issueCommentSatisfiedByCommentId: null,
          issueCommentRetryQueuedAt: null,
        });
      }
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    // A failed/timed-out/cancelled run may immediately enqueue the normal
    // assignment or continuation recovery below. Do not let the lower-priority
    // status-only missing-comment wake claim the issue first. The dedicated
    // missing-comment retry still records exhaustion if that retry itself
    // fails, but an original failed execution remains on the established
    // direct-adapter recovery path.
    if (
      run.status !== "succeeded" &&
      readNonEmptyString(contextSnapshot.retryReason) !==
        "missing_issue_comment"
    ) {
      if (run.issueCommentStatus !== "not_applicable") {
        await patchRunIssueCommentStatus(run.id, {
          issueCommentStatus: "not_applicable",
          issueCommentSatisfiedByCommentId: null,
          issueCommentRetryQueuedAt: null,
        });
      }
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    // A settled run may legitimately have no user-facing prose. The response
    // resolver owns that decision; do not wake the agent again merely to force
    // an artificial comment into the issue thread.
    if (
      presentationDecision?.chosenSource === "none" &&
      (hasAcceptedSemanticResult(parseObject(run.resultJson)) ||
        presentationDecision.reasonCodes.includes(
          "legacy_adapter_summary_ambiguous",
        ))
    ) {
      await patchRunIssueCommentStatus(run.id, {
        issueCommentStatus: "not_applicable",
        issueCommentSatisfiedByCommentId: null,
        issueCommentRetryQueuedAt: null,
      });
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    // A pre-dispatch setup failure means the adapter process never started (for
    // example an unresolved workspace base ref). No agent could run, so no agent
    // could post an issue comment. A missing-comment retry cannot help and would
    // loop the identical pre-adapter failure, so mark the policy not_applicable
    // and queue nothing.
    if (
      run.errorCode != null &&
      PRE_ADAPTER_SETUP_FAILURE_CODES.has(run.errorCode)
    ) {
      if (run.issueCommentStatus !== "not_applicable") {
        await patchRunIssueCommentStatus(run.id, {
          issueCommentStatus: "not_applicable",
          issueCommentSatisfiedByCommentId: null,
          issueCommentRetryQueuedAt: null,
        });
      }
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    const postedComment = await findRunIssueComment(
      run.id,
      run.companyId,
      issueId,
      parseObject(run.resultJson),
    );
    if (postedComment) {
      await patchRunIssueCommentStatus(run.id, {
        issueCommentStatus: "satisfied",
        issueCommentSatisfiedByCommentId: postedComment.id,
        issueCommentRetryQueuedAt: null,
      });
      return { outcome: "satisfied" as const, queuedRun: null };
    }

    // Missing-comment recovery is a legacy compatibility path for otherwise
    // successful runs. A failed, timed-out, or cancelled run is already owned
    // by lifecycle recovery and its terminal system presentation. Queuing a
    // prose-only retry here can seize the issue execution lock before the
    // authoritative continuation is materialized, replacing real recovery
    // with a cheap status-only turn.
    if (run.status !== "succeeded") {
      await patchRunIssueCommentStatus(run.id, {
        issueCommentStatus: "not_applicable",
        issueCommentSatisfiedByCommentId: null,
        issueCommentRetryQueuedAt: null,
      });
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    if (
      readNonEmptyString(contextSnapshot.retryReason) ===
      "missing_issue_comment"
    ) {
      await patchRunIssueCommentStatus(run.id, {
        issueCommentStatus: "retry_exhausted",
        issueCommentSatisfiedByCommentId: null,
      });
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message:
          "Run ended without an issue comment after one retry; no further comment wake will be queued",
      });
      return { outcome: "retry_exhausted" as const, queuedRun: null };
    }

    if (!shouldRequireIssueCommentForWake(contextSnapshot)) {
      if (run.issueCommentStatus !== "not_applicable") {
        await patchRunIssueCommentStatus(run.id, {
          issueCommentStatus: "not_applicable",
          issueCommentSatisfiedByCommentId: null,
          issueCommentRetryQueuedAt: null,
        });
      }
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    if (
      await hasDeferredIssueCommentWake(run.companyId, issueId, run.agentId)
    ) {
      await patchRunIssueCommentStatus(run.id, {
        issueCommentStatus: "not_applicable",
        issueCommentSatisfiedByCommentId: null,
        issueCommentRetryQueuedAt: null,
      });
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "info",
        message:
          "Run ended without an issue comment; a deferred comment wake already exists for this issue",
      });
      return { outcome: "not_applicable" as const, queuedRun: null };
    }

    const queuedRun = await enqueueMissingIssueCommentRetry(
      run,
      agent,
      issueId,
    );
    if (queuedRun) {
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message:
          "Run ended without an issue comment; queued one follow-up wake to require a comment",
      });
      return { outcome: "retry_queued" as const, queuedRun };
    }

    await patchRunIssueCommentStatus(run.id, {
      issueCommentStatus: "retry_exhausted",
      issueCommentSatisfiedByCommentId: null,
    });
    return { outcome: "retry_exhausted" as const, queuedRun: null };
  }

  async function enqueueProcessLossRetry(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
    now: Date,
  ) {
    // Completion deliveries own their durable bounded retry and reply identity.
    // A second process-loss retry would compete for the same outbox input.
    if (run.contextSnapshot?.wakeReason === CHAT_COMPLETION_WAKE_REASON &&
        Array.isArray(run.contextSnapshot?.chatCompletionDeliveryIds)) return null;
    // Native sessions have their own fenced same-run controller. Legacy
    // bootstrap recovery shares the durable delay and incident counter with
    // transient retries; process loss must not open a second retry budget.
    if (run.runtimeMode === "native" || await legacyExecutionNeedsReconciliationWithEvidence(db, run))
      return null;
    const scheduled = await scheduleBoundedRetryForRun(run, agent, { now });
    return scheduled.outcome === "scheduled" ? scheduled.run : null;
  }

  function toHotRestartIntentRun(input: {
    run: typeof heartbeatRuns.$inferSelect;
    adapterType: string;
  }): HotRestartIntentRun {
    const context = parseObject(input.run.contextSnapshot);
    return {
      runId: input.run.id,
      companyId: input.run.companyId,
      agentId: input.run.agentId,
      adapterType: input.adapterType,
      status: input.run.status,
      processPid: input.run.processPid ?? null,
      processGroupId: input.run.processGroupId ?? null,
      issueId: readNonEmptyString(context.issueId),
      runtimeMode: input.run.runtimeMode,
      nativeSessionId: input.run.nativeSessionId,
      runnerInstanceId: input.run.runnerInstanceId,
      processStartedAt: input.run.processStartedAt?.toISOString() ?? null,
    };
  }

  function isServerStdioBoundHotRestartRun(input: {
    run: typeof heartbeatRuns.$inferSelect;
    adapterType: string;
    adapterConfig: unknown;
  }) {
    const context = parseObject(input.run.contextSnapshot);
    if (
      context.processTopology === "server_stdio" ||
      context.executionEngine === "acp"
    ) {
      return true;
    }
    if (
      context.processTopology === "detached" ||
      context.executionEngine === "cli"
    ) {
      return false;
    }
    if (
      !["claude_local", "codex_local", "gemini_local"].includes(
        input.adapterType,
      )
    ) {
      return false;
    }
    return (
      readNonEmptyString(parseObject(input.adapterConfig).engine) !== "cli"
    );
  }

  async function prepareHotRestartShutdown(
    signal: "SIGINT" | "SIGTERM",
    now = new Date(),
  ) {
    shutdownInProgress = true;
    const idleSessions = await closeIdleWarmNativeSessionsForRestart();
    if (idleSessions.failed > 0) {
      logger.warn({ idleSessions }, "idle native sessions could not checkpoint before controller shutdown");
    }
    let intent: Awaited<ReturnType<typeof readHotRestartIntent>>;
    try {
      intent = await readHotRestartIntent();
    } catch (err) {
      logger.warn(
        { err },
        "failed to read hot-restart intent; falling back to normal shutdown drain",
      );
      return {
        mode: "read_error" as const,
        skipDrain: false as const,
        activeRunIds: [] as string[],
      };
    }

    if (!intent)
      return {
        mode: "not_requested" as const,
        skipDrain: false as const,
        activeRunIds: [] as string[],
      };
    if (intent.drainRequired)
      return {
        mode: "drain_required" as const,
        skipDrain: false as const,
        activeRunIds: [] as string[],
      };
    if (!shouldHonorHotRestartIntentForProcess(intent)) {
      logger.warn(
        { expectedPid: intent.previousServerPid, currentPid: process.pid },
        "hot-restart intent targets a different server pid; falling back to normal shutdown drain",
      );
      return {
        mode: "pid_mismatch" as const,
        skipDrain: false as const,
        activeRunIds: [] as string[],
      };
    }

    const activeRuns = await db
      .select({
        run: heartbeatRuns,
        adapterType: agents.adapterType,
        adapterConfig: agents.adapterConfig,
      })
      .from(heartbeatRuns)
      .innerJoin(agents, eq(heartbeatRuns.agentId, agents.id))
      .where(eq(heartbeatRuns.status, "running"));
    const snapshotRuns = activeRuns.map(toHotRestartIntentRun);
    const intentWithVersion = {
      ...intent,
      previousServerVersion: intent.previousServerVersion ?? serverVersion,
    };

    const serverStdioRuns = activeRuns.filter(isServerStdioBoundHotRestartRun);
    if (serverStdioRuns.length > 0) {
      const activeServerStdioRunIds = serverStdioRuns.map(({ run }) => run.id);
      await writeHotRestartShutdownSnapshot({
        intent: intentWithVersion,
        signal,
        activeRuns: snapshotRuns,
        drainReason: "active_acp_run",
        drainRunIds: activeServerStdioRunIds,
        capturedAt: now,
      });

      logger.warn(
        {
          signal,
          previousServerPid: intent.previousServerPid,
          activeRunIds: snapshotRuns.map((run) => run.runId),
          activeServerStdioRunIds,
          drainReason: "active_acp_run",
        },
        "server-stdio agent run prevents hot-restart adoption; using graceful drain and retry",
      );

      return {
        mode: "acp_drain_required" as const,
        skipDrain: false as const,
        activeRunIds: snapshotRuns.map((run) => run.runId),
        activeAcpRunIds: activeServerStdioRunIds,
        drainRunIds: activeServerStdioRunIds,
        drainReason: "active_acp_run" as const,
      };
    }

    await writeHotRestartShutdownSnapshot({
      intent: intentWithVersion,
      signal,
      activeRuns: snapshotRuns,
      capturedAt: now,
    });

    for (const { run } of activeRuns) {
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "info",
        message:
          "Hot restart requested; leaving child process alive for startup adoption",
        payload: {
          signal,
          previousServerPid: intent.previousServerPid,
          previousServerVersion: intentWithVersion.previousServerVersion,
          processPid: run.processPid ?? null,
          processGroupId: run.processGroupId ?? null,
        },
      });
    }

    const nativeRunIds = activeRuns
      .filter(
        ({ run, adapterType }) =>
          adapterType === "paperclip_runner" &&
          isNativeSessionId(run.nativeSessionId),
      )
      .map(({ run }) => run.id);
    const detachedNativeSessions =
      await detachNativeSessionsForRestart(nativeRunIds);

    logger.info(
      {
        signal,
        previousServerPid: intent.previousServerPid,
        activeRunIds: snapshotRuns.map((run) => run.runId),
        detachedNativeSessions,
      },
      "hot-restart shutdown snapshot captured; skipping graceful run drain",
    );

    return {
      mode: "hot_restart" as const,
      skipDrain: true as const,
      activeRunIds: snapshotRuns.map((run) => run.runId),
    };
  }

  async function reconcileHotRestartAdoption(now = new Date()) {
    let intent: Awaited<ReturnType<typeof readHotRestartIntent>>;
    try {
      intent = await readHotRestartIntent();
    } catch (err) {
      logger.warn(
        { err },
        "failed to read hot-restart intent on startup; skipping adoption",
      );
      return {
        mode: "read_error" as const,
        adoptedRunIds: [] as string[],
        finalizedWhileDownRunIds: [] as string[],
        lostRunIds: [] as string[],
        skippedRunIds: [] as string[],
      };
    }
    if (!intent) {
      return {
        mode: "not_requested" as const,
        adoptedRunIds: [] as string[],
        finalizedWhileDownRunIds: [] as string[],
        lostRunIds: [] as string[],
        skippedRunIds: [] as string[],
      };
    }

    if (!intent.shutdownSnapshot) {
      const log = intent.drainRequired
        ? logger.info.bind(logger)
        : logger.warn.bind(logger);
      log(
        {
          previousServerPid: intent.previousServerPid,
          preflightActiveRunIds: intent.preflightActiveRunIds,
          drainReason: intent.drainReason ?? null,
        },
        intent.drainRequired
          ? "drain-required restart intent has no adoption snapshot"
          : "hot-restart intent present but shutdown snapshot is missing; no runs can be adopted",
      );
    }
    const candidates = intent.shutdownSnapshot?.activeRuns ?? [];
    const missingSnapshotRunIds = findMissingHotRestartSnapshotRunIds(intent);
    const reconciliationRunIds = [
      ...new Set([
        ...candidates.map((run) => run.runId),
        ...missingSnapshotRunIds,
      ]),
    ];
    const currentRows =
      reconciliationRunIds.length > 0
        ? await db
            .select({
              run: heartbeatRuns,
              adapterType: agents.adapterType,
            })
            .from(heartbeatRuns)
            .innerJoin(agents, eq(heartbeatRuns.agentId, agents.id))
            .where(inArray(heartbeatRuns.id, reconciliationRunIds))
        : [];
    const currentByRunId = new Map(currentRows.map((row) => [row.run.id, row]));

    const reportRuns: HotRestartReportRun[] = [];
    const adoptedRunIds: string[] = [];
    const finalizedWhileDownRunIds: string[] = [];
    const lostRunIds: string[] = [];
    const skippedRunIds: string[] = [];

    const classify = (
      candidate: HotRestartIntentRun,
      classification: HotRestartReportRun["classification"],
      reason: string,
      patch?: Partial<HotRestartIntentRun>,
    ) => {
      const run = {
        ...candidate,
        ...patch,
        classification,
        reason,
      } satisfies HotRestartReportRun;
      reportRuns.push(run);
      if (classification === "adopted") adoptedRunIds.push(candidate.runId);
      else if (classification === "finalized_while_down")
        finalizedWhileDownRunIds.push(candidate.runId);
      else if (classification === "lost") lostRunIds.push(candidate.runId);
      else skippedRunIds.push(candidate.runId);
    };

    for (const runId of missingSnapshotRunIds) {
      const current = currentByRunId.get(runId);
      if (!current) {
        finalizedWhileDownRunIds.push(runId);
        continue;
      }

      const candidate = toHotRestartIntentRun(current);
      if (current.run.status !== "running") {
        classify(
          candidate,
          "finalized_while_down",
          `run_status_${current.run.status}`,
        );
      } else {
        classify(candidate, "lost", "missing_shutdown_snapshot");
      }
    }

    if (lostRunIds.length > 0) {
      logger.error(
        { previousServerPid: intent.previousServerPid, lostRunIds },
        "hot-restart shutdown snapshot omitted live preflight runs; reporting them as lost",
      );
    }

    for (const candidate of candidates) {
      const current = currentByRunId.get(candidate.runId);
      if (!current) {
        classify(candidate, "finalized_while_down", "run_row_missing");
        continue;
      }

      const { run, adapterType } = current;
      const patch = {
        adapterType,
        status: run.status,
        processPid: run.processPid ?? candidate.processPid,
        processGroupId: run.processGroupId ?? candidate.processGroupId,
      };

      if (run.status !== "running") {
        classify(
          candidate,
          "finalized_while_down",
          `run_status_${run.status}`,
          patch,
        );
        continue;
      }

      const hasSelectiveAcpDrain =
        intent.drainReason === "active_acp_run" &&
        (intent.drainRunIds?.length ?? 0) > 0;
      if (
        hasSelectiveAcpDrain &&
        intent.drainRunIds?.includes(candidate.runId)
      ) {
        // A selective ACP drain is expected to persist a terminal row before
        // the new server starts. If the process was terminated but that write
        // failed, surface the run as lost instead of hiding it as an expected
        // drain skip.
        classify(candidate, "lost", "selective_drain_not_finalized", patch);
        continue;
      }
      if (intent.drainRequired && !hasSelectiveAcpDrain) {
        classify(candidate, "skipped", "drain_required", patch);
        continue;
      }

      if (run.runtimeMode === "native" && adapterType === "paperclip_runner") {
        classify(candidate, "skipped", "native_restart_recovery_owned", patch);
        continue;
      }

      if (!isTrackedLocalChildProcessAdapter(adapterType)) {
        classify(
          candidate,
          "skipped",
          "adapter_not_local_child_process",
          patch,
        );
        continue;
      }

      const processPid = run.processPid ?? candidate.processPid;
      const processGroupId = run.processGroupId ?? candidate.processGroupId;
      const processPidAlive = isProcessAlive(processPid);
      const processGroupAlive = isProcessGroupAlive(processGroupId);
      if (!processPid && !processGroupId) {
        classify(candidate, "lost", "missing_process_metadata", patch);
        continue;
      }
      if (!processPidAlive && !processGroupAlive) {
        classify(candidate, "lost", "process_not_alive", patch);
        continue;
      }

      const resultJson = mergeHotRestartAdoptionResultJson(
        parseObject(run.resultJson),
        {
          adoptedAt: now,
          previousServerPid: intent.previousServerPid,
          newServerPid: process.pid,
          previousServerVersion: intent.previousServerVersion,
          newServerVersion: serverVersion,
          processPid,
          processGroupId,
        },
      );
      const updated = await db
        .update(heartbeatRuns)
        .set({
          resultJson,
          error:
            run.errorCode === DETACHED_PROCESS_ERROR_CODE ? null : run.error,
          errorCode:
            run.errorCode === DETACHED_PROCESS_ERROR_CODE
              ? null
              : run.errorCode,
          updatedAt: now,
        })
        .where(
          and(
            eq(heartbeatRuns.id, run.id),
            eq(heartbeatRuns.status, "running"),
          ),
        )
        .returning()
        .then((rows) => rows[0] ?? null);

      if (!updated) {
        const latest = await db
          .select({ status: heartbeatRuns.status })
          .from(heartbeatRuns)
          .where(eq(heartbeatRuns.id, run.id))
          .then((rows) => rows[0] ?? null);
        if (latest && latest.status !== "running") {
          classify(
            candidate,
            "finalized_while_down",
            `run_status_${latest.status}`,
            patch,
          );
        } else {
          classify(candidate, "lost", "adoption_update_not_applied", patch);
        }
        continue;
      }

      await appendRunEvent(updated, {
        eventType: "lifecycle",
        stream: "system",
        level: "info",
        message: "Adopted live child process after hot restart",
        payload: {
          previousServerPid: intent.previousServerPid,
          newServerPid: process.pid,
          previousServerVersion: intent.previousServerVersion,
          newServerVersion: serverVersion,
          processPid,
          processGroupId,
        },
      });
      classify(
        candidate,
        "adopted",
        processPidAlive ? "process_pid_alive" : "process_group_alive",
        patch,
      );
    }

    const report = await writeHotRestartReport({
      version: 1,
      requestedAt: intent.requestedAt,
      completedAt: now.toISOString(),
      drainRequired: intent.drainRequired,
      drainReason:
        intent.drainReason ?? (intent.drainRequired ? "requested" : null),
      previousServerPid: intent.previousServerPid,
      newServerPid: process.pid,
      previousServerVersion: intent.previousServerVersion,
      newServerVersion: serverVersion,
      adoptedRunIds,
      finalizedWhileDownRunIds,
      lostRunIds,
      skippedRunIds,
      runs: reportRuns,
    });
    await removeHotRestartIntent(undefined, intent);

    logger.info(
      {
        previousServerPid: report.previousServerPid,
        newServerPid: report.newServerPid,
        adoptedRunIds,
        finalizedWhileDownRunIds,
        lostRunIds,
        missingSnapshotRunIds,
        skippedRunIds,
      },
      "hot-restart adoption report written",
    );

    return {
      mode: "reported" as const,
      adoptedRunIds,
      finalizedWhileDownRunIds,
      lostRunIds,
      skippedRunIds,
    };
  }

  async function recoverNativeRunsAfterRestart(now = new Date()) {
    // A result committed before the old controller stopped outranks process
    // recovery. Finish its durable workspace/status suffix before deciding
    // whether any provider authority needs to be reopened.
    await reconcileNativeFinalizations(db, undefined, {
      environmentRuntime,
      onWorkspaceSettled: settleRecoveredNativeWorkspace,
    });
    scheduleRetainedNativeSessionCleanup();
    const intent = await readHotRestartIntent().catch((error) => {
      logger.warn(
        { err: error },
        "failed to read hot-restart intent before native startup recovery",
      );
      return null;
    });
    const restartKind = intent ? ("hot" as const) : ("hard" as const);
    const previousStartedAt = intent?.previousServerStartedAt
      ? new Date(intent.previousServerStartedAt)
      : null;
    const scheduledNativeRetries = await db
      .select({
        runId: nativeRunFinalizations.runId,
        nextAttemptAt: nativeRunFinalizations.nextAttemptAt,
      })
      .from(nativeRunFinalizations)
      .innerJoin(
        heartbeatRuns,
        eq(heartbeatRuns.id, nativeRunFinalizations.runId),
      )
      .where(
        and(
          eq(heartbeatRuns.runtimeMode, "native"),
          inArray(heartbeatRuns.status, ["running", "failed"]),
          isNull(nativeRunFinalizations.resultId),
          eq(nativeRunFinalizations.phase, "retryable_failure"),
          gt(nativeRunFinalizations.nextAttemptAt, now),
        ),
      );
    for (const scheduled of scheduledNativeRetries) {
      if (scheduled.nextAttemptAt) {
        scheduleNativeSessionResumeDispatch(
          scheduled.runId,
          scheduled.nextAttemptAt,
        );
      }
    }
    const dispositions = await claimNativeRestartRecoveries({
      db,
      restartKind,
      recoveryRequestId: intent?.recoveryRequestId ?? null,
      coordinatedPreviousController: intent
        ? {
            pid: intent.previousServerPid,
            processStartedAt:
              previousStartedAt && !Number.isNaN(previousStartedAt.getTime())
                ? previousStartedAt
                : null,
          }
        : null,
      now,
    });

    const claims = dispositions.filter(
      (disposition): disposition is NativeRestartRecoveryClaim =>
        disposition.kind === "reattach_existing_runner" ||
        disposition.kind === "reattach_remote_runner" ||
        disposition.kind === "resume_dead_runner" ||
        disposition.kind === "bootstrap_incomplete",
    );
    for (const disposition of dispositions) {
      const run = await getRun(disposition.runId);
      if (run) {
        const isClaim =
          disposition.kind === "reattach_existing_runner" ||
          disposition.kind === "reattach_remote_runner" ||
          disposition.kind === "resume_dead_runner" ||
          disposition.kind === "bootstrap_incomplete";
        await appendRunEvent(run, {
          eventType: "native.recovery.transition",
          stream: "system",
          level: disposition.kind === "blocked" ? "warn" : "info",
          message:
            disposition.kind === "reattach_existing_runner" ||
            disposition.kind === "reattach_remote_runner"
              ? "Recovering the existing native runner process after server restart"
              : disposition.kind === "resume_dead_runner"
                ? "Resuming the durable native provider session after runner process loss"
                : disposition.kind === "bootstrap_incomplete"
                  ? "Restarting an incomplete native runner bootstrap on the same heartbeat run"
                  : disposition.kind === "awaiting_evidence"
                    ? "Native restart recovery is waiting for safe ownership evidence"
                    : disposition.kind === "already_finalized"
                      ? "Native restart recovery found an already-finalized result"
                      : "Native restart recovery blocked ambiguous or conflicting ownership",
          payload: {
            restartKind: isClaim ? disposition.restartKind : restartKind,
            recoveryRequestId: isClaim
              ? disposition.recoveryRequestId
              : (intent?.recoveryRequestId ?? null),
            runnerDisposition: disposition.kind,
            ...(isClaim
              ? {
                  controllerGeneration: disposition.controllerGeneration,
                  providerAttempt: disposition.providerAttempt,
                }
              : { reason: disposition.reason }),
            ...(disposition.kind === "reattach_existing_runner"
              ? {
                  processPid: disposition.process.pid,
                  processGroupId: disposition.process.processGroupId,
                  processStartedAt: disposition.process.startedAt,
                }
              : {}),
          },
        });
      }
    }
    for (const claim of claims) {
      const execution = executeRun(claim.runId, {
        nativeLeaseOwner: claim.leaseOwner,
        nativeRestartRecovery: claim,
      }).catch((error) => {
        logger.error(
          { err: error, runId: claim.runId, disposition: claim.kind },
          "native restart recovery execution failed",
        );
      });
      activeRunExecutionPromises.add(execution);
      void execution.finally(() =>
        activeRunExecutionPromises.delete(execution),
      );
    }

    return {
      restartKind,
      claims,
      dispositions,
      scheduledRetryRunIds: scheduledNativeRetries.map((entry) => entry.runId),
      awaitingEvidenceRunIds: dispositions
        .filter((entry) => entry.kind === "awaiting_evidence")
        .map((entry) => entry.runId),
      blockedRunIds: dispositions
        .filter((entry) => entry.kind === "blocked")
        .map((entry) => entry.runId),
    };
  }

  async function drainRunningRunsForShutdown(
    signal: "SIGINT" | "SIGTERM",
    now = new Date(),
    runIds: readonly string[] | null = null,
  ) {
    const selectedRunIds = runIds ? [...new Set(runIds)] : null;
    if (selectedRunIds?.length === 0) {
      return {
        interrupted: 0,
        interruptedRunIds: [],
        retryRunIds: [],
        restartSuspendedRunIds: [],
      };
    }
    const activeRuns = await db
      .select({
        run: heartbeatRuns,
        agent: agents,
      })
      .from(heartbeatRuns)
      .innerJoin(agents, eq(heartbeatRuns.agentId, agents.id))
      .where(
        selectedRunIds
          ? and(
              eq(heartbeatRuns.status, "running"),
              inArray(heartbeatRuns.id, selectedRunIds),
            )
          : eq(heartbeatRuns.status, "running"),
      );

    const interruptedRunIds: string[] = [];
    const retryRunIds: string[] = [];
    const restartSuspendedRunIds: string[] = [];

    for (const { run, agent } of activeRuns) {
      // Shutdown owns only this boot's legacy executions. Expired foreign
      // owners belong to the reaper, not another container's drain.
      if (run.runtimeMode === "legacy" && run.controllerBootId &&
          run.controllerBootId !== legacyControllerBootId) continue;
      if (isNativeRunnerOwnershipHeld(run)) continue;
      if (
        run.runtimeMode === "native" &&
        agent.adapterType === "paperclip_runner"
      ) {
        // A graceful shutdown relinquishes controller authority just like a
        // hot restart. Leaving the old event consumer attached lets its
        // finalizer interrupt/suspend Claude while the next server is adopting
        // the same turn.
        await detachNativeSessionsForRestart([run.id]);
        const recoveryHistoryEntry = JSON.stringify({
          at: now.toISOString(),
          restartKind: "graceful",
          disposition: "restart_suspended",
          reason: signal,
          processPid: run.processPid,
          processStartedAt: run.processStartedAt?.toISOString() ?? null,
        });
        await db
          .update(nativeRunFinalizations)
          .set({
            recoveryState: "awaiting_runner_reattach",
            recoveryHistory: sql`(
              select coalesce(jsonb_agg(item order by ordinal), '[]'::jsonb)
              from jsonb_array_elements(
                coalesce(${nativeRunFinalizations.recoveryHistory}, '[]'::jsonb)
                || jsonb_build_array(${recoveryHistoryEntry}::jsonb)
              ) with ordinality as history(item, ordinal)
              where ordinal > greatest(
                jsonb_array_length(
                  coalesce(${nativeRunFinalizations.recoveryHistory}, '[]'::jsonb)
                  || jsonb_build_array(${recoveryHistoryEntry}::jsonb)
                ) - 20,
                0
              )
            )`,
            updatedAt: now,
          })
          .where(
            and(
              eq(nativeRunFinalizations.runId, run.id),
              isNull(nativeRunFinalizations.resultId),
            ),
          );
        await appendRunEvent(run, {
          eventType: "native.recovery.transition",
          stream: "system",
          level: "info",
          message:
            "Server shutdown suspended native controller ownership without cancelling provider work",
          payload: {
            restartKind: "graceful",
            signal,
            runnerDisposition: "awaiting_runner_reattach",
            processPid: run.processPid,
            processGroupId: run.processGroupId,
            processStartedAt: run.processStartedAt?.toISOString() ?? null,
            retryRunCreated: false,
          },
        });
        restartSuspendedRunIds.push(run.id);
        continue;
      }
      const message = `Interrupted by graceful server shutdown (${signal})`;
      const running = runningProcesses.get(run.id);
      try {
        if (run.runtimeMode === "native") {
          await cancelHeartbeatNativeRun({
            db,
            runId: run.id,
            reason: message,
            runtimeMode: run.runtimeMode,
          });
        }
        if (running) {
          await terminateHeartbeatRunProcess({
            pid: running.child.pid,
            processGroupId: running.processGroupId,
            graceMs: Math.max(1, running.graceSec) * 1000,
          });
        }
      } finally {
        runningProcesses.delete(run.id);
      }

      const persistedCancellationResult =
        run.runtimeMode === "native"
          ? await getRun(run.id).then((current) =>
              parseObject(current?.resultJson),
            )
          : parseObject(run.resultJson);

      const interruptedStatus = await setRunStatusIfRunning(
        run.id,
        "interrupted",
        {
          finishedAt: now,
          error: message,
          errorCode: "server_shutdown_interrupted",
          signal,
          resultJson: mergeRunStopMetadataForAgent(agent, "interrupted", {
            conversationContinuationEligible: await runUsedConversationAdapter(db, run),
            resultJson: persistedCancellationResult,
            errorCode: "server_shutdown_interrupted",
            errorMessage: message,
          }),
        },
      );
      if (!interruptedStatus.updated || !interruptedStatus.run) continue;
      let interrupted = interruptedStatus.run;
      await setWakeupStatus(run.wakeupRequestId, "cancelled", {
        finishedAt: now,
        error: null,
      });
      interrupted =
        (await classifyAndPersistRunLiveness(
          interrupted,
          parseObject(interrupted.resultJson),
        )) ?? interrupted;

      await releaseEnvironmentLeasesForRun({
        runId: interrupted.id,
        companyId: interrupted.companyId,
        agentId: interrupted.agentId,
        status: interrupted.status,
        failureReason: interrupted.error ?? undefined,
      });

      const retry = await enqueueProcessLossRetry(interrupted, agent, now);
      if (!retry) {
        await releaseIssueExecutionAndPromote(interrupted);
      } else {
        retryRunIds.push(retry.id);
      }

      await appendRunEvent(interrupted, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message,
        payload: {
          signal,
          ...(run.processPid ? { processPid: run.processPid } : {}),
          ...(run.processGroupId ? { processGroupId: run.processGroupId } : {}),
          ...(retry ? { retryRunId: retry.id } : {}),
        },
      });

      await finalizeAgentStatus(run.agentId, "interrupted", message, {
        wasFirstHeartbeat: timerClaimWasFirstHeartbeat(run),
      });
      interruptedRunIds.push(interrupted.id);
    }

    if (interruptedRunIds.length > 0) {
      logger.warn(
        {
          signal,
          interrupted: interruptedRunIds.length,
          interruptedRunIds,
          retryRunIds,
        },
        "interrupted running heartbeat runs for graceful shutdown",
      );
    }

    return {
      interrupted: interruptedRunIds.length,
      interruptedRunIds,
      retryRunIds,
      restartSuspendedRunIds,
    };
  }

  async function scheduleBoundedRetryForRun(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
    opts?: {
      now?: Date;
      random?: () => number;
      retryReason?: string;
      wakeReason?: string;
      maxAttempts?: number;
      delayMs?: number;
    },
  ) {
    if (run.errorCode === "provider_tool_definition_invalid") {
      return { outcome: "not_scheduled" as const,
        reason: "Repair the invalid tool definitions before starting a new attempt.",
        issueId: readNonEmptyString(run.contextSnapshot?.issueId) };
    }
    if (Array.isArray(run.contextSnapshot?.chatCompletionDeliveryIds) &&
        run.contextSnapshot.chatCompletionDeliveryIds.some(id => typeof id === "string")) {
      return { outcome: "not_scheduled" as const, reason: "The completion outbox owns this reply's retry budget and publication identity.",
        errorCode: "chat_completion_outbox_owns_retry" as const, issueId: readNonEmptyString(run.contextSnapshot.issueId) };
    }
    const now = opts?.now ?? new Date();
    const retryReason =
      opts?.retryReason ?? BOUNDED_TRANSIENT_HEARTBEAT_RETRY_REASON;
    const wakeReason =
      opts?.wakeReason ?? BOUNDED_TRANSIENT_HEARTBEAT_RETRY_WAKE_REASON;
    const maxAttempts = Math.max(
      0,
      Math.floor(
        opts?.maxAttempts ?? BOUNDED_TRANSIENT_HEARTBEAT_RETRY_MAX_ATTEMPTS,
      ),
    );
    const consumedAttempts = executionRetryAttemptCount(run, retryReason);
    const nextAttempt = consumedAttempts + 1;
    const computedBaseSchedule =
      opts?.delayMs != null
        ? nextAttempt <= maxAttempts
          ? {
              attempt: nextAttempt,
              baseDelayMs: Math.max(0, Math.floor(opts.delayMs)),
              delayMs: Math.max(0, Math.floor(opts.delayMs)),
              dueAt: new Date(
                now.getTime() + Math.max(0, Math.floor(opts.delayMs)),
              ),
              maxAttempts,
            }
          : null
        : nextAttempt <= maxAttempts
          ? computeBoundedTransientHeartbeatRetrySchedule(
              nextAttempt,
              now,
              opts?.random,
            )
          : null;
    const baseSchedule = computedBaseSchedule
      ? { ...computedBaseSchedule, maxAttempts }
      : null;
    const transientRecovery =
      retryReason === BOUNDED_TRANSIENT_HEARTBEAT_RETRY_REASON
        ? readTransientRecoveryContractFromRun(run)
        : null;
    const codexTransientFallbackMode =
      agent.adapterType === "codex_local" &&
      transientRecovery?.errorFamily === "transient_upstream"
        ? resolveCodexTransientFallbackMode(nextAttempt)
        : null;
    const transientRetryNotBefore = transientRecovery?.retryNotBefore ?? null;
    const contextSnapshot = parseObject(run.contextSnapshot);
    const issueId = readNonEmptyString(contextSnapshot.issueId);

    if (!baseSchedule) {
      const exhaustion = {
        retryReason,
        scheduledRetryAttempt: consumedAttempts,
        maxAttempts,
      };
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message: `Bounded retry exhausted after ${consumedAttempts} scheduled attempts; no further automatic retry will be queued`,
        payload: exhaustion,
        retryExhaustion: exhaustion,
      });
      if (retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON) {
        await escalatePlanApprovalResumeFailureNeedsAttention({
          run,
          issueId,
          attempt: Math.min(
            consumedAttempts,
            maxAttempts,
          ),
          maxAttempts,
        }).catch((error) => {
          logger.warn(
            { err: error, runId: run.id, issueId },
            "failed to escalate exhausted plan-approval resume failure",
          );
        });
      }
      return {
        outcome: "retry_exhausted" as const,
        attempt: nextAttempt,
        maxAttempts,
      };
    }

    if (await legacyExecutionNeedsReconciliationWithEvidence(db, run)) {
      return {
        outcome: "not_scheduled" as const,
        reason:
          "Reconcile the previous execution before retrying; safe provider recovery is unavailable.",
        errorCode: "legacy_execution_requires_reconciliation" as const,
        issueId: readNonEmptyString(run.contextSnapshot?.issueId),
      };
    }
    if (retryReason !== MAX_TURN_CONTINUATION_RETRY_REASON) {
      const invokability = await getAgentInvokability(agent);
      if (!invokability.invokable) {
        await appendRunEvent(run, {
          eventType: "lifecycle",
          stream: "system",
          level: "warn",
          message:
            "Scheduled retry suppressed because the agent is not invokable",
          payload: {
            retryReason,
            scheduledRetryAttempt: nextAttempt,
            maxAttempts,
            reason: invokability.reason,
            invalidOrgChain: invokability.invalidOrgChain,
            ...invokability.details,
          },
        });
        return {
          outcome: "not_scheduled" as const,
          reason:
            "Scheduled retry suppressed because the agent is not invokable",
          errorCode: "agent_not_invokable" as const,
          issueId,
        };
      }
    }

    const schedule =
      transientRetryNotBefore &&
      transientRetryNotBefore.getTime() > baseSchedule.dueAt.getTime()
        ? {
            ...baseSchedule,
            dueAt: transientRetryNotBefore,
            delayMs: Math.max(
              0,
              transientRetryNotBefore.getTime() - now.getTime(),
            ),
          }
        : baseSchedule;

    const requiresIssueGate =
      isTransientWorkspaceGitScanCode(run.errorCode) ||
      hasConversationContinuationPolicy(run.resultJson) ||
      (retryReason === AI_CONNECTION_BUSY_RETRY_REASON || retryReason === AI_CONNECTION_POOL_WAIT_RETRY_REASON) ||
      retryReason === MAX_TURN_CONTINUATION_RETRY_REASON ||
      retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON;
    if (requiresIssueGate) {
      const gate = await runDispatch.evaluateScheduledRetryGate({
        runId: run.id,
        companyId: run.companyId,
        retryReasonOverride: retryReason,
        now,
      });
      if (!gate.allowed) {
        await appendRunEvent(run, {
          eventType: "lifecycle",
          stream: "system",
          level: "warn",
          message: gate.reason,
          payload: {
            retryReason,
            scheduledRetryAttempt: nextAttempt,
            maxAttempts,
            ...gate.details,
          },
        });
        return {
          outcome: "not_scheduled" as const,
          reason: gate.reason,
          errorCode: gate.errorCode,
          issueId: gate.issueId,
        };
      }
    }
    const taskKey = deriveTaskKeyWithHeartbeatFallback(contextSnapshot, null);
    const sessionBefore = await resolveSessionBeforeForWakeup(agent, taskKey);
    const interactionContinuationPayload =
      retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON
        ? {
            mutation: "interaction",
            interactionId: readNonEmptyString(contextSnapshot.interactionId),
            interactionKind: readNonEmptyString(
              contextSnapshot.interactionKind,
            ),
            interactionStatus: readNonEmptyString(
              contextSnapshot.interactionStatus,
            ),
            continuationPolicy: readNonEmptyString(
              contextSnapshot.continuationPolicy,
            ),
          }
        : {};
    const workspaceValidationRetryPayload =
      retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON &&
      isWorkspaceValidationFailedRun(run)
        ? readWorkspaceValidationPayloadFromRun(run)
        : null;
    const shouldQuarantineWorkspaceForRetry =
      workspaceValidationRetryPayload !== null &&
      Object.keys(workspaceValidationRetryPayload).length > 0;
    const retryContextSnapshot: Record<string, unknown> = withRecoveryContext(
      {
        ...contextSnapshot,
        executionRetryAccounting: accountingForScheduledRetry(run, retryReason, schedule.attempt),
        retryOfRunId: run.id,
        wakeReason,
        retryReason,
        ...(retryReason === WORKSPACE_BUSY_RETRY_REASON
          ? {
              failureRetriesBeforeWorkspaceWait:
                executionFailureRetryCount(run),
            }
          : {}),
        ...((retryReason === AI_CONNECTION_BUSY_RETRY_REASON || retryReason === AI_CONNECTION_POOL_WAIT_RETRY_REASON)
          ? { failureRetriesBeforeAiConnectionWait: executionFailureRetryCount(run) }
          : {}),
        ...(shouldQuarantineWorkspaceForRetry
          ? {
              workspaceValidationRecovery: {
                strategy: "quarantine_failed_workspace_and_retry_clean",
                sourceRunId: run.id,
                reason:
                  readNonEmptyString(workspaceValidationRetryPayload?.reason) ??
                  WORKSPACE_VALIDATION_FAILURE_CODE,
                fingerprint: readNonEmptyString(
                  workspaceValidationRetryPayload?.fingerprint,
                ),
                failedExecutionWorkspaceId: readNonEmptyString(
                  workspaceValidationRetryPayload?.executionWorkspaceId,
                ),
              },
            }
          : {}),
        ...(transientRecovery
          ? { errorFamily: transientRecovery.errorFamily }
          : {}),
        scheduledRetryAttempt: schedule.attempt,
        scheduledRetryAt: schedule.dueAt.toISOString(),
        ...(transientRetryNotBefore
          ? { transientRetryNotBefore: transientRetryNotBefore.toISOString() }
          : {}),
        ...(transientRecovery?.errorFamily === "provider_quota" &&
        transientRetryNotBefore
          ? {
              providerQuotaRetryNotBefore:
                transientRetryNotBefore.toISOString(),
            }
          : {}),
        ...(codexTransientFallbackMode ? { codexTransientFallbackMode } : {}),
      },
      "normal_model",
    );
    const responsibleUserId = await resolveResponsibleUserIdForRunContext(
      run,
      retryContextSnapshot,
    );
    const continuationRetryIdempotencyKey =
      retryReason === MAX_TURN_CONTINUATION_RETRY_REASON
        ? `max-turn-continuation:${run.companyId}:${issueId ?? "no-issue"}:${run.id}:${schedule.attempt}`
        : retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON
          ? `interaction-continuation:${run.companyId}:${issueId ?? "no-issue"}:${run.id}:${schedule.attempt}`
          : null;

    type ScheduledRetryTransactionResult =
      | {
          outcome: "scheduled";
          run: typeof heartbeatRuns.$inferSelect;
          reusedExisting: boolean;
        }
      | {
          outcome: "not_scheduled";
          reason: string;
          errorCode:
            | "issue_not_found"
            | "issue_reassigned"
            | "issue_cancelled"
            | "issue_terminal_status"
            | "issue_not_in_progress"
            | "continuation_user_authorization_missing"
            | "issue_execution_lock_changed";
          issueId: string | null;
          details: Record<string, unknown>;
        };

    const scheduleResult = await db.transaction(
      async (tx): Promise<ScheduledRetryTransactionResult> => {
        // All automatic failure paths share the same predecessor claim. A
        // duplicate monitor, restart sweep or wake must reuse its successor.
        if (
          retryReason !== MAX_TURN_CONTINUATION_RETRY_REASON &&
          retryReason !== INTERACTION_CONTINUATION_INFRA_RETRY_REASON
        ) {
          if (issueId)
            await tx.execute(
              sql`select id from issues where company_id = ${run.companyId} and id = ${issueId} for update`,
            );
          await tx.execute(
            sql`select id from heartbeat_runs where company_id = ${run.companyId} and id = ${run.id} for update`,
          );
          const [existing] = await tx
            .select()
            .from(heartbeatRuns)
            .where(
              and(
                eq(heartbeatRuns.companyId, run.companyId),
                eq(heartbeatRuns.retryOfRunId, run.id),
              ),
            )
            .limit(1);
          if (existing)
            return {
              outcome: "scheduled",
              run: existing,
              reusedExisting: true,
            };
        }
        if (retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON) {
          if (issueId) {
            await tx.execute(
              sql`select id from issues where company_id = ${run.companyId} and id = ${issueId} for update`,
            );
          } else {
            await tx.execute(
              sql`select id from heartbeat_runs where company_id = ${run.companyId} and id = ${run.id} for update`,
            );
          }

          const existingContinuation = await tx
            .select()
            .from(heartbeatRuns)
            .where(
              and(
                eq(heartbeatRuns.companyId, run.companyId),
                eq(heartbeatRuns.retryOfRunId, run.id),
                eq(heartbeatRuns.scheduledRetryReason, retryReason),
                eq(heartbeatRuns.scheduledRetryAttempt, schedule.attempt),
                inArray(heartbeatRuns.status, [
                  ...MAX_TURN_CONTINUATION_LIVE_RUN_STATUSES,
                ]),
                issueId
                  ? sql`${heartbeatRuns.contextSnapshot} ->> 'issueId' = ${issueId}`
                  : sql`${heartbeatRuns.contextSnapshot} ->> 'issueId' is null`,
              ),
            )
            .orderBy(asc(heartbeatRuns.createdAt), asc(heartbeatRuns.id))
            .limit(1)
            .then((rows) => rows[0] ?? null);

          if (existingContinuation) {
            if (existingContinuation.wakeupRequestId) {
              const existingWakeup = await tx
                .select({ coalescedCount: agentWakeupRequests.coalescedCount })
                .from(agentWakeupRequests)
                .where(
                  eq(
                    agentWakeupRequests.id,
                    existingContinuation.wakeupRequestId,
                  ),
                )
                .then((rows) => rows[0] ?? null);

              await tx
                .update(agentWakeupRequests)
                .set({
                  coalescedCount: (existingWakeup?.coalescedCount ?? 0) + 1,
                  updatedAt: now,
                })
                .where(
                  eq(
                    agentWakeupRequests.id,
                    existingContinuation.wakeupRequestId,
                  ),
                );
            }

            return {
              outcome: "scheduled",
              run: existingContinuation,
              reusedExisting: true,
            };
          }
        }

        if (retryReason === MAX_TURN_CONTINUATION_RETRY_REASON) {
          if (issueId) {
            await tx.execute(
              sql`select id from issues where company_id = ${run.companyId} and id = ${issueId} for update`,
            );
          } else {
            await tx.execute(
              sql`select id from heartbeat_runs where company_id = ${run.companyId} and id = ${run.id} for update`,
            );
          }

          const existingContinuation = await tx
            .select()
            .from(heartbeatRuns)
            .where(
              and(
                eq(heartbeatRuns.companyId, run.companyId),
                eq(heartbeatRuns.retryOfRunId, run.id),
                eq(heartbeatRuns.scheduledRetryReason, retryReason),
                eq(heartbeatRuns.scheduledRetryAttempt, schedule.attempt),
                inArray(heartbeatRuns.status, [
                  ...MAX_TURN_CONTINUATION_LIVE_RUN_STATUSES,
                ]),
                issueId
                  ? sql`${heartbeatRuns.contextSnapshot} ->> 'issueId' = ${issueId}`
                  : sql`${heartbeatRuns.contextSnapshot} ->> 'issueId' is null`,
              ),
            )
            .orderBy(asc(heartbeatRuns.createdAt), asc(heartbeatRuns.id))
            .limit(1)
            .then((rows) => rows[0] ?? null);

          if (existingContinuation) {
            if (existingContinuation.wakeupRequestId) {
              const existingWakeup = await tx
                .select({ coalescedCount: agentWakeupRequests.coalescedCount })
                .from(agentWakeupRequests)
                .where(
                  eq(
                    agentWakeupRequests.id,
                    existingContinuation.wakeupRequestId,
                  ),
                )
                .then((rows) => rows[0] ?? null);

              await tx
                .update(agentWakeupRequests)
                .set({
                  coalescedCount: (existingWakeup?.coalescedCount ?? 0) + 1,
                  updatedAt: now,
                })
                .where(
                  eq(
                    agentWakeupRequests.id,
                    existingContinuation.wakeupRequestId,
                  ),
                );
            }

            return {
              outcome: "scheduled",
              run: existingContinuation,
              reusedExisting: true,
            };
          }

          if (issueId) {
            const lockedIssue = await tx
              .select({
                id: issues.id,
                status: issues.status,
                assigneeAgentId: issues.assigneeAgentId,
                executionRunId: issues.executionRunId,
              })
              .from(issues)
              .where(
                and(
                  eq(issues.id, issueId),
                  eq(issues.companyId, run.companyId),
                ),
              )
              .then((rows) => rows[0] ?? null);

            if (!lockedIssue) {
              return {
                outcome: "not_scheduled",
                reason:
                  "Scheduled max-turn continuation suppressed because the target issue no longer exists",
                errorCode: "issue_not_found",
                issueId,
                details: { issueId },
              };
            }

            if (lockedIssue.assigneeAgentId !== run.agentId) {
              return {
                outcome: "not_scheduled",
                reason:
                  "Scheduled max-turn continuation suppressed because issue ownership changed",
                errorCode: "issue_reassigned",
                issueId,
                details: {
                  issueId,
                  previousAssigneeAgentId: run.agentId,
                  currentAssigneeAgentId: lockedIssue.assigneeAgentId,
                },
              };
            }

            if (
              lockedIssue.status === "cancelled" ||
              lockedIssue.status === "done"
            ) {
              return {
                outcome: "not_scheduled",
                reason: `Scheduled max-turn continuation suppressed because issue reached terminal status (${lockedIssue.status})`,
                errorCode:
                  lockedIssue.status === "cancelled"
                    ? "issue_cancelled"
                    : "issue_terminal_status",
                issueId,
                details: { issueId, currentStatus: lockedIssue.status },
              };
            }

            if (lockedIssue.status !== "in_progress") {
              return {
                outcome: "not_scheduled",
                reason: `Scheduled max-turn continuation suppressed because issue is no longer in_progress (current status: ${lockedIssue.status})`,
                errorCode: "issue_not_in_progress",
                issueId,
                details: {
                  issueId,
                  currentStatus: lockedIssue.status,
                  requiredStatus: "in_progress",
                },
              };
            }

            if (lockedIssue.executionRunId !== run.id) {
              return {
                outcome: "not_scheduled",
                reason:
                  "Scheduled max-turn continuation suppressed because the issue execution lock belongs to a different run",
                errorCode: "issue_execution_lock_changed",
                issueId,
                details: {
                  issueId,
                  expectedExecutionRunId: run.id,
                  currentExecutionRunId: lockedIssue.executionRunId,
                },
              };
            }
          }
        }

        if (
          (retryReason === AI_CONNECTION_BUSY_RETRY_REASON || retryReason === AI_CONNECTION_POOL_WAIT_RETRY_REASON) && issueId &&
          !isNonAssigneeWorkspaceBusyRetry(retryReason, contextSnapshot)
        ) {
          // The issue row is locked above. Recheck after the preflight gate so
          // cancellation or recovery cannot leave a successor without its lock.
          const [lockedIssue] = await tx.select({ executionRunId: issues.executionRunId })
            .from(issues).where(and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)));
          if (lockedIssue?.executionRunId !== run.id) {
            return {
              outcome: "not_scheduled", issueId, errorCode: "issue_execution_lock_changed",
              reason: "Subscription retry suppressed because the task execution lock changed",
              details: { issueId, expectedExecutionRunId: run.id, currentExecutionRunId: lockedIssue?.executionRunId ?? null },
            };
          }
        }

        const scheduledRunId = randomUUID();
        if (contextSnapshot.explicitUserContinuation) {
          const continuation = issueId && retryReason === "transient_failure" ? await admitExplicitContinuationRetry({
            db: tx as unknown as Db, companyId: run.companyId, issueId, agentId: run.agentId,
            parentRunId: run.id, successorRunId: scheduledRunId, now,
          }) : null;
          if (!continuation) return {
            outcome: "not_scheduled", issueId,
            errorCode: "continuation_user_authorization_missing",
            reason: "The automatic retry could not revalidate the original user continuation.",
            details: {},
          };
          retryContextSnapshot.explicitUserContinuation = continuation;
          retryContextSnapshot.previousRunId = continuation.previousRunId;
        }

        const wakeupRequest = await tx
          .insert(agentWakeupRequests)
          .values({
            companyId: run.companyId,
            agentId: run.agentId,
            source: "automation",
            triggerDetail: "system",
            reason: wakeReason,
            payload: withRecoveryContext(
              {
                ...(issueId ? { issueId } : {}),
                retryOfRunId: run.id,
                ...interactionContinuationPayload,
                retryReason,
                ...(transientRecovery
                  ? { errorFamily: transientRecovery.errorFamily }
                  : {}),
                scheduledRetryAttempt: schedule.attempt,
                scheduledRetryAt: schedule.dueAt.toISOString(),
                ...(transientRetryNotBefore
                  ? {
                      transientRetryNotBefore:
                        transientRetryNotBefore.toISOString(),
                    }
                  : {}),
                ...(transientRecovery?.errorFamily === "provider_quota" &&
                transientRetryNotBefore
                  ? {
                      providerQuotaRetryNotBefore:
                        transientRetryNotBefore.toISOString(),
                    }
                  : {}),
                ...(codexTransientFallbackMode
                  ? { codexTransientFallbackMode }
                  : {}),
              },
              "normal_model",
            ),
            status: "queued",
            requestedByActorType: "system",
            requestedByActorId: null,
            idempotencyKey: continuationRetryIdempotencyKey,
            updatedAt: now,
          })
          .returning()
          .then((rows) => rows[0]);

        const scheduledRun = await tx
          .insert(heartbeatRuns)
          .values({
            id: scheduledRunId,
            companyId: run.companyId,
            agentId: run.agentId,
            invocationSource: "automation",
            triggerDetail: "system",
            status: "scheduled_retry",
            wakeupRequestId: wakeupRequest.id,
            contextSnapshot: retryContextSnapshot,
            ...(hasConversationContinuationPolicy(run.resultJson)
              ? { resultJson: { conversationContinuation: CONVERSATION_CONTINUATION_POLICY } } : {}),
            responsibleUserId,
            sessionIdBefore: sessionBefore,
            retryOfRunId: run.id,
            scheduledRetryAt: schedule.dueAt,
            scheduledRetryAttempt: schedule.attempt,
            scheduledRetryReason: retryReason,
            continuationAttempt: readContinuationAttempt(
              retryContextSnapshot.livenessContinuationAttempt,
            ),
            updatedAt: now,
          })
          .returning()
          .then((rows) => rows[0]);

        await tx
          .update(agentWakeupRequests)
          .set({
            runId: scheduledRun.id,
            updatedAt: now,
          })
          .where(eq(agentWakeupRequests.id, wakeupRequest.id));

        let detachWorkspaceFromIssue = false;
        if (issueId && shouldQuarantineWorkspaceForRetry) {
          const issueWorkspace = await tx
            .select({
              id: issues.id,
              companyId: issues.companyId,
              executionWorkspaceId: issues.executionWorkspaceId,
            })
            .from(issues)
            .where(
              and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)),
            )
            .for("update")
            .then((rows) => rows[0] ?? null);
          const failedExecutionWorkspaceId =
            readNonEmptyString(
              workspaceValidationRetryPayload?.executionWorkspaceId,
            ) ?? readNonEmptyString(issueWorkspace?.executionWorkspaceId);

          if (issueWorkspace && failedExecutionWorkspaceId) {
            const failedWorkspace = await tx
              .select({
                id: executionWorkspaces.id,
                companyId: executionWorkspaces.companyId,
                sourceIssueId: executionWorkspaces.sourceIssueId,
                status: executionWorkspaces.status,
                metadata: executionWorkspaces.metadata,
              })
              .from(executionWorkspaces)
              .where(
                and(
                  eq(executionWorkspaces.id, failedExecutionWorkspaceId),
                  eq(executionWorkspaces.companyId, run.companyId),
                ),
              )
              .for("update")
              .then((rows) => rows[0] ?? null);

            const workspaceBelongsToIssue = failedWorkspace
              ? failedWorkspace.sourceIssueId === issueId
              : false;

            if (
              failedWorkspace &&
              workspaceBelongsToIssue &&
              issueWorkspace.executionWorkspaceId === failedExecutionWorkspaceId
            ) {
              const existingMetadata = parseObject(failedWorkspace.metadata);
              const quarantine = {
                reason: WORKSPACE_VALIDATION_FAILURE_CODE,
                retryReason,
                sourceRunId: run.id,
                retryRunId: scheduledRun.id,
                issueId,
                sourceIssueId: failedWorkspace.sourceIssueId ?? null,
                quarantinedAt: now.toISOString(),
                workspaceValidation: workspaceValidationRetryPayload ?? {},
              };
              await tx
                .update(executionWorkspaces)
                .set({
                  status: "archived",
                  closedAt: now,
                  cleanupEligibleAt: null,
                  cleanupReason: WORKSPACE_VALIDATION_FAILURE_CODE,
                  metadata: {
                    ...existingMetadata,
                    workspaceValidationQuarantine: quarantine,
                  },
                  updatedAt: now,
                })
                .where(
                  and(
                    eq(executionWorkspaces.id, failedWorkspace.id),
                    eq(executionWorkspaces.companyId, run.companyId),
                  ),
                );

              await logActivity(tx as unknown as Db, {
                companyId: run.companyId,
                actorType: "system",
                actorId: "heartbeat",
                agentId: run.agentId,
                runId: run.id,
                action: "execution_workspace.workspace_validation_quarantined",
                entityType: "execution_workspace",
                entityId: failedWorkspace.id,
                details: quarantine,
              });
              detachWorkspaceFromIssue =
                issueWorkspace.executionWorkspaceId ===
                failedExecutionWorkspaceId;
            }
          }
        }

        if (issueId) {
          await tx
            .update(issues)
            .set({
              executionRunId: scheduledRun.id,
              checkoutRunId: sql`case when ${issues.checkoutRunId} = ${run.id} then null else ${issues.checkoutRunId} end`,
              executionAgentNameKey: normalizeAgentNameKey(agent.name),
              executionLockedAt: now,
              ...(detachWorkspaceFromIssue
                ? {
                    executionWorkspaceId: null,
                    executionWorkspacePreference: null,
                  }
                : {}),
              updatedAt: now,
            })
            .where(
              and(
                eq(issues.id, issueId),
                eq(issues.companyId, run.companyId),
                eq(issues.executionRunId, run.id),
              ),
            );
        }

        return {
          outcome: "scheduled",
          run: scheduledRun,
          reusedExisting: false,
        };
      },
    );

    if (scheduleResult.outcome === "not_scheduled") {
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message: scheduleResult.reason,
        payload: {
          retryReason,
          scheduledRetryAttempt: nextAttempt,
          maxAttempts,
          ...scheduleResult.details,
        },
      });
      return {
        outcome: "not_scheduled" as const,
        reason: scheduleResult.reason,
        errorCode: scheduleResult.errorCode,
        issueId: scheduleResult.issueId,
      };
    }

    const retryRun = scheduleResult.run;
    const dueAt = retryRun.scheduledRetryAt
      ? new Date(retryRun.scheduledRetryAt)
      : schedule.dueAt;

    if (scheduleResult.reusedExisting) {
      await appendRunEvent(run, {
        eventType: "lifecycle",
        stream: "system",
        level: "info",
        message: `Reused existing continuation retry ${retryRun.scheduledRetryAttempt}/${schedule.maxAttempts}`,
        payload: {
          retryRunId: retryRun.id,
          retryReason,
          idempotencyKey: continuationRetryIdempotencyKey,
          scheduledRetryAttempt: retryRun.scheduledRetryAttempt,
          scheduledRetryAt: dueAt.toISOString(),
        },
      });

      return {
        outcome: "scheduled" as const,
        run: retryRun,
        dueAt,
        attempt: retryRun.scheduledRetryAttempt,
        maxAttempts: schedule.maxAttempts,
        reusedExisting: true,
      };
    }

    await appendRunEvent(run, {
      eventType: "lifecycle",
      stream: "system",
      level: "warn",
      message: `Scheduled bounded retry ${schedule.attempt}/${schedule.maxAttempts} for ${schedule.dueAt.toISOString()}`,
      payload: {
        retryRunId: retryRun.id,
        retryReason,
        ...(transientRecovery
          ? { errorFamily: transientRecovery.errorFamily }
          : {}),
        scheduledRetryAttempt: schedule.attempt,
        scheduledRetryAt: schedule.dueAt.toISOString(),
        baseDelayMs: schedule.baseDelayMs,
        delayMs: schedule.delayMs,
        ...(transientRetryNotBefore
          ? { transientRetryNotBefore: transientRetryNotBefore.toISOString() }
          : {}),
        ...(transientRecovery?.errorFamily === "provider_quota" &&
        transientRetryNotBefore
          ? {
              providerQuotaRetryNotBefore:
                transientRetryNotBefore.toISOString(),
            }
          : {}),
        ...(codexTransientFallbackMode ? { codexTransientFallbackMode } : {}),
      },
    });

    if (retryReason === INTERACTION_CONTINUATION_INFRA_RETRY_REASON) {
      await recordPlanApprovalResumeFailureRetry({
        run,
        issueId,
        retryRunId: retryRun.id,
        attempt: schedule.attempt,
        maxAttempts: schedule.maxAttempts,
      }).catch((error) => {
        logger.warn(
          { err: error, runId: run.id, issueId, retryRunId: retryRun.id },
          "failed to record plan-approval resume retry failure",
        );
      });
    }

    return {
      outcome: "scheduled" as const,
      run: retryRun,
      dueAt,
      attempt: schedule.attempt,
      maxAttempts: schedule.maxAttempts,
    };
  }

  // Finds a running heartbeat run (other than the caller's) whose context
  // issue shares the same project workspace, i.e. the run that currently
  // "holds" the shared working tree. Runs that have been silent past
  // WORKSPACE_BUSY_HOLDER_STALE_AFTER_MS do not count — a zombie holder must
  // not park other work forever. This cutoff is independent of informational
  // silence warnings. When isolated workspaces are enabled, holders whose
  // issue explicitly opted into an isolated workspace never touch the shared
  // tree, so they are excluded; a NULL/agent_default mode may resolve to the
  // shared tree and counts as a holder (over-serializing is the safe
  // direction). When the isolated-workspaces experiment is off, every run
  // resolves to the shared tree, so no holder is excluded.
  async function findSharedWorkspaceHolder(input: {
    companyId: string;
    projectWorkspaceId: string;
    excludeIssueId: string;
    excludeRunId: string;
    honorIsolatedWorkspaceModes: boolean;
    now?: Date;
  }): Promise<SharedWorkspaceHolder | null> {
    const staleCutoff = new Date(
      (input.now ?? new Date()).getTime() -
        WORKSPACE_BUSY_HOLDER_STALE_AFTER_MS,
    );
    return await db
      .select({
        runId: heartbeatRuns.id,
        agentId: heartbeatRuns.agentId,
        issueId: sql<string>`${issues.id}::text`,
        issueIdentifier: issues.identifier,
      })
      .from(heartbeatRuns)
      .innerJoin(
        issues,
        and(
          eq(issues.companyId, heartbeatRuns.companyId),
          sql`${issues.id}::text = ${heartbeatRuns.contextSnapshot} ->> 'issueId'`,
        ),
      )
      .where(
        and(
          eq(heartbeatRuns.companyId, input.companyId),
          eq(heartbeatRuns.status, "running"),
          ne(heartbeatRuns.id, input.excludeRunId),
          // Last observed activity: output beats start beats creation. A run
          // that started recently but has not written output yet is live.
          sql`coalesce(${heartbeatRuns.lastOutputAt}, ${heartbeatRuns.startedAt}, ${heartbeatRuns.createdAt}) >= ${staleCutoff.toISOString()}::timestamptz`,
          eq(issues.projectWorkspaceId, input.projectWorkspaceId),
          ne(sql`${issues.id}::text`, input.excludeIssueId),
          ...(input.honorIsolatedWorkspaceModes
            ? [
                or(
                  // Covers both a NULL settings blob and a blob without a mode
                  // key; either may still resolve to the shared workspace.
                  sql`${issues.executionWorkspaceSettings} ->> 'mode' is null`,
                  notInArray(
                    sql`${issues.executionWorkspaceSettings} ->> 'mode'`,
                    [...ISOLATED_EXECUTION_WORKSPACE_MODES],
                  ),
                ),
              ]
            : []),
        ),
      )
      .orderBy(asc(heartbeatRuns.createdAt), asc(heartbeatRuns.id))
      .limit(1)
      .then((rows) => rows[0] ?? null);
  }

  // No code path raises the `ai_connection_busy` error any more. This
  // function stays because a stored run row can still carry that error code
  // from an earlier release.
  async function finalizeAiConnectionBusyDeferral(
    run: typeof heartbeatRuns.$inferSelect,
    error: HttpError,
    wasIssueAssignee: boolean,
  ) {
    const now = new Date();
    const cancelled = await setRunStatusIfRunning(run.id, "cancelled", {
      error: error.message, errorCode: AI_CONNECTION_BUSY_RETRY_REASON, finishedAt: now,
      resultJson: { executionRecovery: { kind: "ai_connection_wait", providerWorkStarted: false } },
      contextSnapshot: {
        ...parseObject(run.contextSnapshot),
        aiConnectionBusyDeferredWhileAssignee: wasIssueAssignee,
      },
    });
    if (!cancelled.updated) return;
    await setWakeupStatus(run.wakeupRequestId, "cancelled", { finishedAt: now, error: error.message }).catch(() => undefined);
    const cancelledRun = cancelled.run ?? await getRun(run.id);
    const agent = await getAgent(run.agentId);
    let scheduled = false;
    try {
      if (cancelledRun && agent) {
        const retry = await scheduleBoundedRetryForRun(cancelledRun, agent, {
          now, retryReason: AI_CONNECTION_BUSY_RETRY_REASON, wakeReason: "ai_connection_busy_retry",
          maxAttempts: (cancelledRun.scheduledRetryAttempt ?? 0) + 1,
          delayMs: computeWorkspaceBusyRetryDelayMs(),
        });
        scheduled = retry.outcome === "scheduled";
        await appendRunEvent(cancelledRun, {
          eventType: "lifecycle", stream: "system", level: "info",
          message: scheduled ? "Waiting for the shared AI subscription. This task will retry automatically." : "The AI subscription is busy; this task can no longer retry automatically.",
          payload: { retryScheduled: scheduled },
        });
      }
    } finally {
      try {
        if (cancelledRun && !scheduled) await releaseIssueExecutionAndPromote(cancelledRun);
      } finally {
        await finalizeAgentStatus(run.agentId, "cancelled", null, { wasFirstHeartbeat: timerClaimWasFirstHeartbeat(run) });
      }
    }
  }

  // Terminal handling for a WorkspaceBusyDeferral thrown by the pre-dispatch
  // gate: cancel the run (contention is not a failure), schedule a
  // workspace_busy retry, and leave the agent idle. The issue execution lock
  // transfers to the scheduled retry run inside scheduleBoundedRetryForRun, so
  // the issue keeps an active execution path and recovery leaves it alone.
  // Deferral has no attempt ceiling — the retry keeps rescheduling while a
  // live holder exists, and holder staleness (not a counter) is what prevents
  // waiting on a zombie. If no retry could be scheduled (agent no longer
  // invokable), the lock is released so the issue does not strand on a
  // cancelled run.
  async function finalizeWorkspaceBusyDeferral(
    run: typeof heartbeatRuns.$inferSelect,
    deferral: WorkspaceBusyDeferral,
  ) {
    const now = new Date();
    const cancelWrite = await setRunStatusIfRunning(run.id, "cancelled", {
      error: deferral.message,
      errorCode: WORKSPACE_BUSY_ERROR_CODE,
      finishedAt: now,
      resultJson: {
        executionRecovery: {
          kind: "workspace_wait",
          providerWorkStarted: false,
        },
        workspaceBusy: {
          projectWorkspaceId: deferral.projectWorkspaceId,
          holderRunId: deferral.holder.runId,
          holderIssueId: deferral.holder.issueId,
          deferralAttempt: deferral.deferralAttempt,
        },
      },
      // Recorded on the run (and inherited by the scheduled retry's context)
      // so the retry promotion gate can tell a non-assignee wake — where an
      // assignee mismatch is the expected state — from a reassignment race.
      contextSnapshot: {
        ...parseObject(run.contextSnapshot),
        workspaceBusyDeferredWhileAssignee: deferral.wasIssueAssignee,
      },
    });
    if (!cancelWrite.updated) {
      logger.info(
        { runId: run.id, currentStatus: cancelWrite.run?.status ?? null },
        "skipping workspace-busy deferral finalization because the run already left running state",
      );
      return;
    }
    await setWakeupStatus(run.wakeupRequestId, "cancelled", {
      finishedAt: now,
      error: deferral.message,
    }).catch(() => undefined);

    const cancelledRun =
      cancelWrite.run ?? (await getRun(run.id).catch(() => null));
    const agentRow = await getAgent(run.agentId).catch(() => null);
    let scheduleOutcome: string | null = null;
    if (cancelledRun && agentRow) {
      const scheduleResult = await scheduleBoundedRetryForRun(
        cancelledRun,
        agentRow,
        {
          now,
          retryReason: WORKSPACE_BUSY_RETRY_REASON,
          wakeReason: WORKSPACE_BUSY_RETRY_WAKE_REASON,
          // Always admit the next attempt: workspace-busy deferral is bounded by
          // holder liveness, not by an attempt counter.
          maxAttempts: (cancelledRun.scheduledRetryAttempt ?? 0) + 1,
          delayMs: computeWorkspaceBusyRetryDelayMs(),
        },
      ).catch((scheduleErr) => {
        logger.error(
          { err: scheduleErr, runId: run.id },
          "failed to schedule workspace-busy retry after deferral",
        );
        return null;
      });
      scheduleOutcome = scheduleResult?.outcome ?? null;
    }

    if (cancelledRun) {
      await appendRunEvent(cancelledRun, {
        eventType: "lifecycle",
        stream: "system",
        level: "info",
        message:
          scheduleOutcome === "scheduled"
            ? `Deferred: ${deferral.message}. Retry ${deferral.deferralAttempt + 1} scheduled; the run waits for the workspace to free.`
            : `Deferred: ${deferral.message}. No retry could be scheduled; releasing the issue for other runs.`,
        payload: {
          projectWorkspaceId: deferral.projectWorkspaceId,
          holderRunId: deferral.holder.runId,
          holderIssueId: deferral.holder.issueId,
          deferralAttempt: deferral.deferralAttempt,
          retryScheduled: scheduleOutcome === "scheduled",
        },
      }).catch(() => undefined);
    }

    if (cancelledRun && scheduleOutcome !== "scheduled") {
      await releaseIssueExecutionAndPromote(cancelledRun).catch(
        (releaseErr) => {
          logger.error(
            { err: releaseErr, runId: run.id },
            "failed to release issue execution after workspace-busy deferral",
          );
        },
      );
    }

    await finalizeAgentStatus(run.agentId, "cancelled", null, {
      wasFirstHeartbeat: timerClaimWasFirstHeartbeat(run),
    }).catch(() => undefined);
  }

  async function scheduleInteractionContinuationInfrastructureRetryIfEligible(
    run: typeof heartbeatRuns.$inferSelect,
    agent: typeof agents.$inferSelect,
  ) {
    if (!run.wakeupRequestId) return null;
    if (!isResolvedInteractionContinuationWakeContext(run.contextSnapshot))
      return null;
    if (!isRetryableInteractionContinuationInfrastructureFailure(run)) {
      const context = parseObject(run.contextSnapshot);
      const issueId = readNonEmptyString(context.issueId);
      await escalatePlanApprovalResumeFailureNeedsAttention({
        run,
        issueId,
        attempt: Math.min(
          run.scheduledRetryAttempt ??
            INTERACTION_CONTINUATION_INFRA_MAX_ATTEMPTS,
          INTERACTION_CONTINUATION_INFRA_MAX_ATTEMPTS,
        ),
        maxAttempts: INTERACTION_CONTINUATION_INFRA_MAX_ATTEMPTS,
      }).catch((error) => {
        logger.warn(
          { err: error, runId: run.id, issueId },
          "failed to escalate non-retryable plan-approval resume failure",
        );
      });
      return null;
    }

    return scheduleBoundedRetryForRun(run, agent, {
      retryReason: INTERACTION_CONTINUATION_INFRA_RETRY_REASON,
      wakeReason: INTERACTION_CONTINUATION_INFRA_WAKE_REASON,
      maxAttempts: INTERACTION_CONTINUATION_INFRA_MAX_ATTEMPTS,
    });
  }

  async function promoteDueScheduledRetries(now = new Date()) {
    const cutoff = await getWorktreeExecutionCutoff();
    const result = await runDispatch.promoteDueScheduledRetries({
      now,
      cutoff,
    });
    applyRunDispatchPostCommitEffects(result.postCommitEffects);
    return { promoted: result.promoted, runIds: result.runIds };
  }

  async function getIssueRetryRun(
    companyId: string,
    issueId: string,
    statuses: Array<"scheduled_retry" | "queued" | "running" | "cancelled">,
  ) {
    if (statuses.length === 0) return null;
    return db
      .select({
        run: heartbeatRuns,
        agentName: agents.name,
      })
      .from(heartbeatRuns)
      .innerJoin(agents, eq(heartbeatRuns.agentId, agents.id))
      .where(
        and(
          eq(heartbeatRuns.companyId, companyId),
          inArray(heartbeatRuns.status, statuses),
          sql`${heartbeatRuns.contextSnapshot} ->> 'issueId' = ${issueId}`,
          sql`${heartbeatRuns.retryOfRunId} is not null`,
        ),
      )
      .orderBy(
        desc(heartbeatRuns.updatedAt),
        desc(heartbeatRuns.createdAt),
        desc(heartbeatRuns.id),
      )
      .limit(1)
      .then((rows) => rows[0] ?? null);
  }

  function summarizeIssueScheduledRetryRun(row: {
    run: typeof heartbeatRuns.$inferSelect;
    agentName: string | null;
  }) {
    return {
      runId: row.run.id,
      status: row.run.status as
        "scheduled_retry" | "queued" | "running" | "cancelled",
      agentId: row.run.agentId,
      agentName: row.agentName,
      retryOfRunId: row.run.retryOfRunId,
      scheduledRetryAt: row.run.scheduledRetryAt,
      scheduledRetryAttempt: row.run.scheduledRetryAttempt,
      scheduledRetryReason: row.run.scheduledRetryReason,
      error: row.run.error,
      errorCode: row.run.errorCode,
    };
  }

  async function retryScheduledRetryNow(input: {
    issueId: string;
    actor?: {
      actorType?: "user" | "agent" | "system";
      actorId?: string | null;
    };
    now?: Date;
  }) {
    const now = input.now ?? new Date();
    const issue = await db
      .select({ id: issues.id, companyId: issues.companyId })
      .from(issues)
      .where(eq(issues.id, input.issueId))
      .then((rows) => rows[0] ?? null);
    if (!issue) throw notFound("Issue not found");

    const scheduled = await getIssueRetryRun(issue.companyId, issue.id, [
      "scheduled_retry",
    ]);
    if (!scheduled) {
      const alreadyPromoted = await getIssueRetryRun(
        issue.companyId,
        issue.id,
        ["queued", "running"],
      );
      if (alreadyPromoted) {
        return {
          outcome: "already_promoted" as const,
          message: "Scheduled retry was already promoted",
          scheduledRetry: summarizeIssueScheduledRetryRun(alreadyPromoted),
        };
      }
      return {
        outcome: "no_scheduled_retry" as const,
        message: "No live scheduled retry exists for this issue",
        scheduledRetry: null,
      };
    }

    const contextSnapshot = {
      ...parseObject(scheduled.run.contextSnapshot),
      scheduledRetryAt: now.toISOString(),
      retryNowRequestedAt: now.toISOString(),
      retryNowRequestedByActorType: input.actor?.actorType ?? null,
      retryNowRequestedByActorId: input.actor?.actorId ?? null,
    };

    const updated = await db.transaction(async (tx) => {
      const row = await tx
        .update(heartbeatRuns)
        .set({
          scheduledRetryAt: now,
          contextSnapshot,
          updatedAt: now,
        })
        .where(
          and(
            eq(heartbeatRuns.id, scheduled.run.id),
            eq(heartbeatRuns.status, "scheduled_retry"),
          ),
        )
        .returning()
        .then((rows) => rows[0] ?? null);
      if (!row) return null;

      if (row.wakeupRequestId) {
        const wakeupPayload = {
          ...parseObject(
            await tx
              .select({ payload: agentWakeupRequests.payload })
              .from(agentWakeupRequests)
              .where(eq(agentWakeupRequests.id, row.wakeupRequestId))
              .then((rows) => rows[0]?.payload ?? null),
          ),
          scheduledRetryAt: now.toISOString(),
          retryNowRequestedAt: now.toISOString(),
        };
        await tx
          .update(agentWakeupRequests)
          .set({
            payload: wakeupPayload,
            updatedAt: now,
          })
          .where(eq(agentWakeupRequests.id, row.wakeupRequestId));
      }

      return row;
    });

    if (!updated) {
      const alreadyPromoted = await getIssueRetryRun(
        issue.companyId,
        issue.id,
        ["queued", "running"],
      );
      if (alreadyPromoted) {
        return {
          outcome: "already_promoted" as const,
          message: "Scheduled retry was already promoted",
          scheduledRetry: summarizeIssueScheduledRetryRun(alreadyPromoted),
        };
      }
      return {
        outcome: "no_scheduled_retry" as const,
        message: "No live scheduled retry exists for this issue",
        scheduledRetry: null,
      };
    }

    await appendRunEvent(updated, {
      eventType: "lifecycle",
      stream: "system",
      level: "info",
      message: "Scheduled retry was requested to run now",
      payload: {
        issueId: issue.id,
        scheduledRetryAttempt: updated.scheduledRetryAttempt,
        scheduledRetryAt: updated.scheduledRetryAt
          ? new Date(updated.scheduledRetryAt).toISOString()
          : null,
        scheduledRetryReason: updated.scheduledRetryReason,
        requestedByActorType: input.actor?.actorType ?? null,
        requestedByActorId: input.actor?.actorId ?? null,
      },
    });

    const promotion = await runDispatch.promoteScheduledRetry({
      runId: updated.id,
      companyId: updated.companyId,
      now,
    });
    if (promotion.outcome === "promoted") {
      applyRunDispatchPostCommitEffects(promotion.postCommitEffects);
    }
    const promotedRow = await getIssueRetryRun(issue.companyId, issue.id, [
      "queued",
      "running",
      "cancelled",
    ]);
    const scheduledRetry = promotedRow
      ? summarizeIssueScheduledRetryRun(promotedRow)
      : summarizeIssueScheduledRetryRun({
          run: updated,
          agentName: scheduled.agentName,
        });

    if (promotion.outcome === "promoted") {
      return {
        outcome: "promoted" as const,
        message: "Scheduled retry was promoted to the queued run pool",
        scheduledRetry,
      };
    }
    if (promotion.outcome === "gate_suppressed") {
      return {
        outcome: "gate_suppressed" as const,
        message: promotion.reason,
        scheduledRetry,
      };
    }
    return {
      outcome: "already_promoted" as const,
      message: "Scheduled retry was already promoted",
      scheduledRetry,
    };
  }

  function parseHeartbeatPolicy(agent: typeof agents.$inferSelect) {
    const runtimeConfig = parseObject(agent.runtimeConfig);
    const heartbeat = parseObject(runtimeConfig.heartbeat);

    return {
      enabled: asBoolean(heartbeat.enabled, false),
      intervalSec: Math.max(0, asNumber(heartbeat.intervalSec, 0)),
      wakeOnDemand: isHeartbeatWakeOnDemandEnabled(agent),
      maxConcurrentRuns: normalizeMaxConcurrentRuns(
        heartbeat.maxConcurrentRuns,
      ),
      skipTimerWhenNoActionableWork: asBoolean(
        heartbeat.skipTimerWhenNoActionableWork ??
          heartbeat.requireActionableTimerWork ??
          heartbeat.issueOnlyTimer,
        false,
      ),
      maxDailyRuns: normalizeOptionalNonNegativeInteger(
        heartbeat.maxDailyRuns ??
          heartbeat.dailyRunLimit ??
          heartbeat.dailyRunCap ??
          heartbeat.maxRunsPerDay,
      ),
      maxDailyCostCents: normalizeOptionalNonNegativeInteger(
        heartbeat.maxDailyCostCents ??
          heartbeat.dailyCostCentsLimit ??
          heartbeat.dailySpendCentsLimit ??
          heartbeat.dailyBudgetCents,
      ),
    };
  }

  function normalizeOptionalNonNegativeInteger(value: unknown) {
    if (value === null || value === undefined || value === "") return null;
    const normalized = Math.floor(asNumber(value, 0));
    return normalized >= 0 ? normalized : null;
  }

  function currentUtcDayWindow(now = new Date()) {
    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );
    const end = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate() + 1,
        0,
        0,
        0,
        0,
      ),
    );
    return { start, end };
  }

  async function getHeartbeatDailyCapBlock(
    agent: typeof agents.$inferSelect,
    policy: ReturnType<typeof parseHeartbeatPolicy>,
    options: {
      checkRunCap?: boolean;
      checkCostCap?: boolean;
      excludeRunId?: string | null;
    } = {},
    client: Pick<Db, "select"> = db,
  ) {
    const checkRunCap = options.checkRunCap ?? true;
    const checkCostCap = options.checkCostCap ?? true;
    const { start, end } = currentUtcDayWindow();
    if (checkRunCap && policy.maxDailyRuns !== null) {
      const conditions = [
        eq(heartbeatRuns.companyId, agent.companyId),
        eq(heartbeatRuns.agentId, agent.id),
        gte(heartbeatRuns.startedAt, start),
        lt(heartbeatRuns.startedAt, end),
        notInArray(heartbeatRuns.status, ["queued", "scheduled_retry"]),
      ];
      if (options.excludeRunId) {
        conditions.push(sql`${heartbeatRuns.id} <> ${options.excludeRunId}`);
      }
      const [row] = await client
        .select({ total: sql<number>`count(*)::integer` })
        .from(heartbeatRuns)
        .where(and(...conditions));
      const observed = Number(row?.total ?? 0);
      if (observed >= policy.maxDailyRuns) {
        return {
          reason: "heartbeat.daily_run_limit",
          observed,
          limit: policy.maxDailyRuns,
        };
      }
    }

    if (checkCostCap && policy.maxDailyCostCents !== null) {
      const [row] = await client
        .select({
          total: sql<number>`coalesce(sum(${costEvents.costCents})::bigint, 0)`,
        })
        .from(costEvents)
        .where(
          and(
            eq(costEvents.companyId, agent.companyId),
            eq(costEvents.agentId, agent.id),
            gte(costEvents.occurredAt, start),
            lt(costEvents.occurredAt, end),
          ),
        );
      const observed = Number(row?.total ?? 0);
      if (observed >= policy.maxDailyCostCents) {
        return {
          reason: "heartbeat.daily_cost_limit",
          observed,
          limit: policy.maxDailyCostCents,
        };
      }
    }

    return null;
  }

  async function cancelQueuedRunForHeartbeatDailyCap(
    run: typeof heartbeatRuns.$inferSelect,
    dailyCapBlock: NonNullable<
      Awaited<ReturnType<typeof getHeartbeatDailyCapBlock>>
    >,
  ) {
    const now = new Date();
    const reason =
      "Cancelled because the agent reached a per-day heartbeat budget cap before adapter invocation";
    const cancelled = await setRunStatus(run.id, "cancelled", {
      finishedAt: now,
      error: reason,
      errorCode: dailyCapBlock.reason,
      resultJson: {
        ...parseObject(run.resultJson),
        stopReason: dailyCapBlock.reason,
        observed: dailyCapBlock.observed,
        limit: dailyCapBlock.limit,
        effectiveTimeoutSec: 0,
        timeoutConfigured: false,
        timeoutSource: "heartbeat_daily_cap_gate",
        timeoutFired: false,
      },
    });
    if (!cancelled) return null;

    await setWakeupStatus(run.wakeupRequestId, "skipped", {
      finishedAt: now,
      error: reason,
    });

    await appendRunEvent(cancelled, {
      eventType: "lifecycle",
      stream: "system",
      level: "warn",
      message: reason,
      payload: {
        reason: dailyCapBlock.reason,
        observed: dailyCapBlock.observed,
        limit: dailyCapBlock.limit,
      },
    });

    await releaseIssueExecutionAndPromote(cancelled, {
      suppressImmediateRecovery: true,
    });

    return cancelled;
  }

  async function hasActionableTimerWork(agent: typeof agents.$inferSelect) {
    const row = await db
      .select({ id: issues.id })
      .from(issues)
      .where(
        and(
          eq(issues.companyId, agent.companyId),
          eq(issues.assigneeAgentId, agent.id),
          isNull(issues.assigneeUserId),
          isNull(issues.hiddenAt),
          inArray(issues.status, [...TIMER_ACTIONABLE_ISSUE_STATUSES]),
          isNull(issues.conversationAgentId),
          nonIdleSlackIssueCondition(),
        ),
      )
      .limit(1)
      .then((rows) => rows[0] ?? null);
    return Boolean(row);
  }

  async function markTimerHeartbeatChecked(
    agentId: string,
    source: WakeupOptions["source"],
  ) {
    if (source !== "timer") return;
    await db
      .update(agents)
      .set({
        lastHeartbeatAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(agents.id, agentId));
  }

  async function claimDueTimerHeartbeat(
    agent: typeof agents.$inferSelect,
    now: Date,
    intervalSec: number,
  ) {
    const dueBefore = new Date(now.getTime() - intervalSec * 1000);
    const claimed = await db
      .update(agents)
      .set({
        lastHeartbeatAt: now,
        updatedAt: now,
      })
      .where(
        and(
          eq(agents.id, agent.id),
          eq(agents.companyId, agent.companyId),
          or(
            lte(agents.lastHeartbeatAt, dueBefore),
            and(
              isNull(agents.lastHeartbeatAt),
              lte(agents.createdAt, dueBefore),
            ),
          ),
        ),
      )
      .returning({ id: agents.id })
      .then((rows) => rows[0] ?? null);
    if (!claimed) return null;
    return { wasFirstHeartbeat: !agent.lastHeartbeatAt };
  }

  function timerClaimWasFirstHeartbeat(
    run: Pick<typeof heartbeatRuns.$inferSelect, "contextSnapshot">,
  ): true | undefined {
    return parseObject(run.contextSnapshot).timerClaimWasFirstHeartbeat === true
      ? true
      : undefined;
  }

  function parseMaxTurnContinuationPolicy(
    agent: typeof agents.$inferSelect,
  ): MaxTurnContinuationPolicy {
    const runtimeConfig = parseObject(agent.runtimeConfig);
    const heartbeat = parseObject(runtimeConfig.heartbeat);
    const configured = parseObject(heartbeat.maxTurnContinuation);
    const rawMaxAttempts = Math.floor(
      asNumber(
        configured.maxAttempts,
        MAX_TURN_CONTINUATION_DEFAULT_MAX_ATTEMPTS,
      ),
    );
    const rawDelayMs = Math.floor(
      asNumber(configured.delayMs, MAX_TURN_CONTINUATION_DEFAULT_DELAY_MS),
    );

    return {
      enabled: asBoolean(configured.enabled, true),
      maxAttempts: Math.max(
        0,
        Math.min(MAX_TURN_CONTINUATION_MAX_ATTEMPTS_CAP, rawMaxAttempts),
      ),
      delayMs: Math.max(
        0,
        Math.min(MAX_TURN_CONTINUATION_MAX_DELAY_MS, rawDelayMs),
      ),
    };
  }

  function issueRunPriorityRank(priority: string | null | undefined) {
    switch (priority) {
      case "critical":
        return 0;
      case "high":
        return 1;
      case "medium":
        return 2;
      case "low":
        return 3;
      default:
        return 4;
    }
  }

  async function listQueuedRunDependencyReadiness(
    companyId: string,
    queuedRuns: Array<typeof heartbeatRuns.$inferSelect>,
  ) {
    const issueIds = [
      ...new Set(
        queuedRuns
          .map((run) =>
            readNonEmptyString(parseObject(run.contextSnapshot).issueId),
          )
          .filter((issueId): issueId is string => Boolean(issueId)),
      ),
    ];
    if (issueIds.length === 0) {
      return new Map<
        string,
        Awaited<ReturnType<typeof issuesSvc.getDependencyReadiness>>
      >();
    }
    return issuesSvc.listDependencyReadiness(companyId, issueIds);
  }

  async function countRunningRunsForAgent(agentId: string) {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(heartbeatRuns)
      .where(
        and(
          eq(heartbeatRuns.agentId, agentId),
          eq(heartbeatRuns.status, "running"),
        ),
      );
    return Number(count ?? 0);
  }

  // Counts running runs instance-wide for one adapter type, e.g. so five
  // agents that all use "litellm" share one admission budget instead of each
  // getting their own maxConcurrentRuns worth of slots against the same
  // downstream gateway. See resolveAdapterConcurrencyLimits for the config
  // shape (issue: shared concurrency bucket per adapter type).
  async function countRunningRunsForAdapterType(
    adapterType: string,
    executor: Db = db,
  ) {
    const [{ count }] = await executor
      .select({ count: sql<number>`count(*)` })
      .from(heartbeatRuns)
      .innerJoin(agents, eq(agents.id, heartbeatRuns.agentId))
      .where(
        and(
          eq(heartbeatRuns.status, "running"),
          eq(agents.adapterType, adapterType),
        ),
      );
    return Number(count ?? 0);
  }

  // Caps `requested` slots to what the adapter-type bucket actually has free,
  // for adapter types that have a configured limit; adapter types with no
  // configured limit pass `requested` through untouched (default: no-op).
  //
  // A Postgres advisory lock keyed by a hash of the adapter type name is held
  // for the duration of the count so that two different agents sharing the
  // same adapter type, both ticking around the same moment, do not both read
  // the same stale headroom and both admit up to the full limit at once --
  // the exact failure mode a plain in-memory counter would have. The lock is
  // released as soon as the count is read; the actual claim a caller makes
  // afterwards still goes through claimQueuedRun's own atomic
  // `UPDATE ... WHERE status = 'queued'`, which is what prevents the same run
  // from ever being claimed twice. Between this function returning and that
  // claim completing there is a small window in which a concurrent scheduler
  // tick for another agent of the same adapter type could also have been
  // admitted, so under contention the bucket can be transiently over by a run
  // or two rather than never exceeded -- turning an unbounded burst (34
  // processes in 9 seconds, observed on a self-hosted instance after a
  // restart) into one bounded by roughly the configured limit, not a
  // hard real-time guarantee.
  async function reserveAdapterConcurrencySlots(
    adapterType: string,
    requested: number,
  ) {
    if (requested <= 0) return 0;
    const limit = adapterConcurrencyLimits[adapterType];
    if (limit === undefined) return requested;
    return db.transaction(async (tx) => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${adapterType}))`);
      const running = await countRunningRunsForAdapterType(adapterType, tx as unknown as Db);
      return Math.max(0, Math.min(requested, limit - running));
    });
  }

  async function withChatControlRecoveryGate(
    run: typeof heartbeatRuns.$inferSelect,
    stage: "claim" | "dispatch",
    onClear: (tx: Db) => Promise<typeof heartbeatRuns.$inferSelect | null>,
    nativeRecovery = false,
  ) {
    const issueId = readNonEmptyString(
      parseObject(run.contextSnapshot).issueId,
    );
    if (!issueId || run.invocationSource !== "automation") return onClear(db);
    await options.beforeChatControlRecoveryCheck?.({
      runId: run.id,
      issueId,
      stage,
    });
    if (stage === "dispatch" && nativeRecovery) {
      // Protected historical/already-admitted owners did not previously take
      // this fence's locks. A fresh exact read keeps unrelated Board contention
      // from turning their recovery into a new admission failure.
      const [current] = await db
        .select()
        .from(heartbeatRuns)
        .where(
          and(
            eq(heartbeatRuns.id, run.id),
            eq(heartbeatRuns.companyId, run.companyId),
            eq(heartbeatRuns.agentId, run.agentId),
            eq(heartbeatRuns.status, "running"),
          ),
        )
        .limit(1);
      if (
        current &&
        current.wakeupRequestId === run.wakeupRequestId &&
        parseObject(current.contextSnapshot).issueId === issueId
      ) {
        const admission = readChatControlRecoveryAdmission(current);
        const expected = readChatControlRecoveryAdmission(run);
        if (
          expected !== "invalid" &&
          (admission === "admitted" ||
            (admission === "historical" && expected === "historical"))
        )
          return onClear(db);
      }
    }
    let terminal: typeof heartbeatRuns.$inferSelect | null = null;
    try {
      const attempt = () => db.transaction(async (tx) => {
        terminal = null;
        // Same queue-edit lock order, then the close committer's conversation
        // row. NOWAIT releases partial locks on contention. Claim defers to the
        // queue; dispatch retries this transaction before considering failure.
        const [issue] = await tx
          .select({ id: issues.id })
          .from(issues)
          .where(
            and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)),
          )
          .for("update", { noWait: true })
          .limit(1);
        if (!issue) return null;
        if (run.wakeupRequestId)
          await tx
            .select({ id: agentWakeupRequests.id })
            .from(agentWakeupRequests)
            .where(
              and(
                eq(agentWakeupRequests.id, run.wakeupRequestId),
                eq(agentWakeupRequests.companyId, run.companyId),
                eq(agentWakeupRequests.agentId, run.agentId),
              ),
            )
            .for("update", { noWait: true })
            .limit(1);
        const [current] = await tx
          .select()
          .from(heartbeatRuns)
          .where(
            and(
              eq(heartbeatRuns.id, run.id),
              eq(heartbeatRuns.companyId, run.companyId),
              eq(heartbeatRuns.agentId, run.agentId),
            ),
          )
          .for("update", { noWait: true })
          .limit(1);
        if (
          !current ||
          current.status !== (stage === "claim" ? "queued" : "running")
        )
          return null;
        const admission = readChatControlRecoveryAdmission(current);
        const expectedAdmission = readChatControlRecoveryAdmission(run);
        const admissionLost =
          expectedAdmission !== "historical" && admission === "historical";
        if (
          stage === "dispatch" &&
          nativeRecovery &&
          !admissionLost &&
          (admission === "historical" || admission === "admitted")
        )
          return onClear(tx as unknown as Db);
        // A new warm child can inherit a prior runner's PID during preparation.
        // Those fields do not prove this run's turn was dispatched.
        // Exact admitted/historical recovery retains its existing ownership;
        // a marked, unadmitted bootstrap must earn admission even after crash.
        const proof =
          admission === "invalid" || admissionLost
            ? { kind: "unresolved" as const }
            : await readChatControlRecoveryStop(
                tx as unknown as Db,
                {
                  companyId: run.companyId,
                  issueId,
                  agentId: run.agentId,
                  sourceRunId: run.id,
                },
                true,
              );
        if (proof.kind === "clear") {
          if (stage === "claim" || admission === "required")
            await tx
              .update(heartbeatRuns)
              .set({
                runnerProfileJson: {
                  ...parseObject(current.runnerProfileJson),
                  [CHAT_CONTROL_RECOVERY_ADMISSION_KEY]:
                    chatControlRecoveryAdmission(
                      current,
                      stage === "dispatch"
                        ? "admitted"
                        : admission === "admitted"
                          ? "admitted"
                          : "required",
                    ),
                },
                updatedAt: new Date(),
              })
              .where(eq(heartbeatRuns.id, current.id));
          return onClear(tx as unknown as Db);
        }
        if (proof.kind === "unresolved" && stage === "claim") return null;
        const now = new Date();
        const stopped = proof.kind === "stopped";
        const code = stopped
          ? CHAT_CONTROL_RECOVERY_STOP_CODE
          : CHAT_CONTROL_RECOVERY_UNRESOLVED_CODE;
        const error = stopped
          ? "Automatic continuation stopped by the committed chat conversation close. Send a new request in chat or on the Board to start fresh work."
          : "Automatic continuation source could not be verified before provider admission. Review the task and send a fresh request; this attempt will not automatically retry.";
        [terminal] = await tx
          .update(heartbeatRuns)
          .set({
            status: stopped ? "cancelled" : "failed",
            errorCode: code,
            error,
            finishedAt: now,
            resultJson: {
              ...parseObject(current.resultJson),
              automaticRecovery: {
                code,
                providerDispatched: false,
                ...(stopped
                  ? {
                      sourceRunId: proof.sourceRunId,
                      conversationId: proof.conversationId,
                      publicationId: proof.publicationId,
                    }
                  : {}),
              },
            },
            updatedAt: now,
          })
          .where(
            and(
              eq(heartbeatRuns.id, current.id),
              eq(heartbeatRuns.status, current.status),
            ),
          )
          .returning();
        if (!terminal) return null;
        if (current.wakeupRequestId)
          await tx
            .update(agentWakeupRequests)
            .set({
              status: stopped ? "skipped" : "failed",
              error,
              finishedAt: now,
              updatedAt: now,
            })
            .where(
              and(
                eq(agentWakeupRequests.id, current.wakeupRequestId),
                eq(agentWakeupRequests.companyId, current.companyId),
                eq(agentWakeupRequests.agentId, current.agentId),
                eq(agentWakeupRequests.runId, current.id),
                ne(agentWakeupRequests.status, "cancelled"),
              ),
            );
        await tx
          .update(issues)
          .set({
            executionRunId: null,
            executionAgentNameKey: null,
            executionLockedAt: null,
            updatedAt: now,
          })
          .where(
            and(
              eq(issues.companyId, current.companyId),
              eq(issues.id, issueId),
              eq(issues.executionRunId, current.id),
            ),
          );
        return null;
      });
      const result = stage === "dispatch"
        ? await retryChatControlAdmission(attempt)
        : await attempt();
      if (terminal) {
        const settled = terminal as typeof heartbeatRuns.$inferSelect;
        publishLiveEvent({
          companyId: settled.companyId,
          type: "heartbeat.run.status",
          payload: {
            runId: settled.id,
            agentId: settled.agentId,
            status: settled.status,
            errorCode: settled.errorCode,
            error: settled.error,
          },
        });
        publishRunLifecyclePluginEvent(settled);
        if (stage === "dispatch")
          await finalizeAgentStatus(settled.agentId, "cancelled");
      }
      return result;
    } catch (error) {
      if (!isExternalChatWaitAuthorizationContention(error)) throw error;
      if (stage === "dispatch") {
        // No effect was admitted. Let the existing setup-failure path settle
        // this attempt distinctly; it must not become a successful close.
        throw new ChatControlRecoveryUnresolvedError();
      }
      return null;
    }
  }

  async function claimQueuedRun(
    run: typeof heartbeatRuns.$inferSelect,
    companyAgents?: AgentOrgRow[],
  ) {
    if (run.status !== "queued") return run;
    const agent = await getAgent(run.agentId);
    if (!agent) {
      await cancelRunInternal(
        run.id,
        "Cancelled because the agent no longer exists",
      );
      return null;
    }
    const invokability = companyAgents
      ? evaluateAgentInvokability(toAgentOrgRow(agent), companyAgents)
      : await getAgentInvokability(agent);
    if (!invokability.invokable) {
      await cancelRunInternal(
        run.id,
        `Cancelled because the agent is not invokable: ${invokability.reason}`,
      );
      return null;
    }

    const context = parseObject(run.contextSnapshot);
    const budgetBlock = await budgets.getInvocationBlock(
      run.companyId,
      run.agentId,
      {
        issueId: readNonEmptyString(context.issueId),
        projectId: readNonEmptyString(context.projectId),
      },
    );
    if (budgetBlock) {
      await cancelRunInternal(run.id, budgetBlock.reason);
      return null;
    }

    const dailyCapBlock = await getHeartbeatDailyCapBlock(
      agent,
      parseHeartbeatPolicy(agent),
      {
        excludeRunId: run.id,
        checkRunCap: true,
        checkCostCap: true,
      },
    );
    if (dailyCapBlock) {
      await cancelQueuedRunForHeartbeatDailyCap(run, dailyCapBlock);
      return null;
    }

    const issueId = readNonEmptyString(context.issueId);
    if (issueId && activeRunExecutions.size > 0) {
      // Native finalization publishes success before workspace synchronization,
      // provider suspension, and lease release finish. A queued comment must
      // not acquire a fresh sandbox while its predecessor still owns that work.
      // The executor's finally block retries this agent after removing its owner.
      const [settlingOwner] = await db.select({ id: heartbeatRuns.id })
        .from(heartbeatRuns)
        .where(and(
          eq(heartbeatRuns.companyId, run.companyId),
          eq(heartbeatRuns.agentId, run.agentId),
          eq(heartbeatRuns.runtimeMode, "native"),
          inArray(heartbeatRuns.id, [...activeRunExecutions]),
          sql`${heartbeatRuns.contextSnapshot}->>'issueId' = ${issueId}`,
        ))
        .limit(1);
      if (settlingOwner) return null;
    }
    if (issueId) {
      const activePauseHold = await treeControlSvc.getActivePauseHoldGate(
        run.companyId,
        issueId,
      );
      const treeHoldInteractionWake =
        activePauseHold &&
        (await isVerifiedIssueTreeControlInteractionWake(db, {
          companyId: run.companyId,
          issueId,
          agentId: run.agentId,
          runId: run.id,
          wakeupRequestId: run.wakeupRequestId,
          contextSnapshot: context,
        }));
      if (activePauseHold && !treeHoldInteractionWake) {
        await cancelRunInternal(
          run.id,
          "Cancelled because issue is held by an active subtree pause hold",
        );
        await logActivity(db, {
          companyId: run.companyId,
          actorType: "system",
          actorId: "system",
          agentId: run.agentId,
          runId: run.id,
          action: "issue.tree_hold_run_interrupted",
          entityType: "heartbeat_run",
          entityId: run.id,
          issueId: issueId,
          details: {
            issueId,
            holdId: activePauseHold.holdId,
            rootIssueId: activePauseHold.rootIssueId,
            source: "heartbeat.claim_queued_run",
            securityPrinciples: [
              "Complete Mediation",
              "Fail Securely",
              "Secure Defaults",
            ],
          },
        });
        return null;
      }

      const dependencyReadiness = await issuesSvc.listDependencyReadiness(
        run.companyId,
        [issueId],
      );
      const readiness = dependencyReadiness.get(issueId);
      const unresolvedBlockerCount = readiness?.unresolvedBlockerCount ?? 0;
      if (
        unresolvedBlockerCount > 0 &&
        !allowsIssueInteractionWake(
          context,
          ISSUE_TREE_CONTROL_INTERACTION_WAKE_REASONS,
        )
      ) {
        await cancelQueuedRunForBlockedDependencies(
          run,
          issueId,
          readiness?.unresolvedBlockerIssueIds ?? [],
        );
        logger.info(
          { runId: run.id, issueId, unresolvedBlockerCount },
          "claimQueuedRun: cancelled blocked queued run",
        );
        return null;
      }

      const staleness = await runDispatch.cancelStaleQueuedRun({
        runId: run.id,
        companyId: run.companyId,
        expectedStatus: "queued",
      });
      if (staleness.outcome === "cancelled") {
        applyRunDispatchPostCommitEffects(staleness.postCommitEffects);
        logger.info(
          { runId: run.id, issueId, errorCode: staleness.errorCode },
          "claimQueuedRun: cancelled stale queued run",
        );
        return null;
      }
    }

    const claimedAt = new Date();
    const responsibleUserId = await resolveResponsibleUserIdForRun({
      run,
      contextSnapshot: context,
      issueContext: issueId
        ? await getIssueExecutionContext(run.companyId, issueId)
        : null,
      routineEnvContext: {
        routineId: null,
        env: null,
        responsibleUserId: null,
      },
    });
    // All ordinary and comment claims use the same company-scoped issue
    // lock. A batch may claim several runs before executeRun tracks any owner.
    async function lockIssueExecutionClaim(tx: Db) {
      const [owner] = issueId ? await tx.select({
        assigneeAgentId: issues.assigneeAgentId,
        executionRunId: issues.executionRunId,
        checkoutRunId: issues.checkoutRunId,
      }).from(issues).where(and(
        eq(issues.id, issueId), eq(issues.companyId, run.companyId),
      )).for("update") : [];
      const ownsIssue = owner?.assigneeAgentId === run.agentId &&
        context.wakeReason !== "source_scoped_recovery_action";
      if (ownsIssue && ["native_safe_replacement", "native_provider_overloaded"].includes(run.scheduledRetryReason ?? "") &&
          owner.checkoutRunId && owner.checkoutRunId !== run.id) {
        return { ownsIssue, blocked: true };
      }
      if (run.scheduledRetryReason === "native_provider_overloaded" && owner?.executionRunId &&
          owner.executionRunId !== run.id && owner.executionRunId !== run.retryOfRunId) {
        return { ownsIssue, blocked: true };
      }
      const previousRunId = run.scheduledRetryReason === "native_provider_overloaded"
        ? run.retryOfRunId : ownsIssue ? owner?.executionRunId : null;
      if (previousRunId && previousRunId !== run.id) {
        const [previous] = await tx.select({ status: heartbeatRuns.status })
          .from(heartbeatRuns).where(and(
            eq(heartbeatRuns.id, previousRunId),
            eq(heartbeatRuns.companyId, run.companyId),
          ));
        // A terminal result can precede workspace/lease cleanup on this or
        // another controller. Local absence alone is not a release receipt.
        if (!isHeartbeatRunTerminalStatus(previous?.status) ||
            liveRunExecutions.has(previousRunId)) {
          return { ownsIssue, blocked: true };
        }
        const [pendingLease] = await tx.select({ id: environmentLeases.id })
          .from(environmentLeases).where(and(
            eq(environmentLeases.companyId, run.companyId),
            eq(environmentLeases.heartbeatRunId, previousRunId),
            or(and(isNull(environmentLeases.releasedAt),
                // Warm release deliberately retains the sandbox. Its successful
                // receipt settles the old run without destroying the resource.
                sql`not coalesce(${environmentLeases.status} = 'retained'
                  and ${environmentLeases.leasePolicy} = 'reuse_by_environment'
                  and ${environmentLeases.cleanupStatus} = 'success', false)`),
              eq(environmentLeases.status, "pending_cleanup"),
              eq(environmentLeases.cleanupStatus, "failed")),
          )).limit(1);
        const [finalization] = await tx.select({
          phase: nativeRunFinalizations.phase, leaseOwner: nativeRunFinalizations.leaseOwner,
        }).from(nativeRunFinalizations).where(and(
          eq(nativeRunFinalizations.companyId, run.companyId),
          eq(nativeRunFinalizations.runId, previousRunId),
        ));
        if (pendingLease || (finalization && (finalization.leaseOwner ||
            !["committed", "applied", "terminal_failure"].includes(finalization.phase)))) {
          return { ownsIssue, blocked: true };
        }
      }
      return { ownsIssue, blocked: false };
    }
    async function bindClaimedIssueExecution(tx: Db, ownsIssue: boolean, claimedRun: typeof heartbeatRuns.$inferSelect | null | undefined) {
      if (!claimedRun || !issueId || !ownsIssue) return;
      await tx.update(issues).set({
        executionRunId: claimedRun.id,
        executionAgentNameKey: normalizeAgentNameKey(agent.name),
        executionLockedAt: claimedAt,
        updatedAt: claimedAt,
      }).where(and(eq(issues.id, issueId), eq(issues.companyId, run.companyId)));
    }
    const nativeReviewContext = readNativeReviewAssignmentContext(context);
    const queuedCommentIds = queuedCommentIdsFromRunContext(context);
    if (
      issueId &&
      run.invocationSource === "automation" &&
      queuedCommentIds.length > 0
    )
      await options.beforeChatControlRecoveryCheck?.({
        runId: run.id,
        issueId,
        stage: "claim",
      });
    const queuedCommentClaim =
      !nativeReviewContext && issueId && run.wakeupRequestId && queuedCommentIds.length > 0
        ? await db
            .transaction(async (tx) => {
              // Match the queue-edit lock order: issue, wake, then run. Once the
              // run becomes running, a concurrent discard must observe the
              // claimed wake and return an explicit conflict; if discard wins,
              // this claim observes the cancelled queue and does no work.
              const issueClaim = await lockIssueExecutionClaim(tx as unknown as Db);
              if (issueClaim.blocked) return { kind: "stale" as const, run: null };
              const wake = await tx
                .select()
                .from(agentWakeupRequests)
                .where(
                  and(
                    eq(agentWakeupRequests.id, run.wakeupRequestId!),
                    eq(agentWakeupRequests.companyId, run.companyId),
                    eq(agentWakeupRequests.agentId, run.agentId),
                  ),
                )
                .for("update")
                .limit(1)
                .then((rows) => rows[0] ?? null);
              const lockedRun = await tx
                .select()
                .from(heartbeatRuns)
                .where(
                  and(
                    eq(heartbeatRuns.id, run.id),
                    eq(heartbeatRuns.companyId, run.companyId),
                    eq(heartbeatRuns.agentId, run.agentId),
                  ),
                )
                .for("update")
                .limit(1)
                .then((rows) => rows[0] ?? null);
              if (
                !wake ||
                wake.status !== "queued" ||
                wake.runId !== run.id ||
                !lockedRun ||
                lockedRun.status !== "queued" ||
                lockedRun.wakeupRequestId !== wake.id
              ) {
                return { kind: "stale" as const, run: null };
              }

              if (lockedRun.invocationSource === "automation") {
                const admission = readChatControlRecoveryAdmission(lockedRun);
                if (admission === "invalid")
                  return { kind: "stale" as const, run: null };
                const proof = await readChatControlRecoveryStop(
                  tx as unknown as Db,
                  {
                    companyId: lockedRun.companyId,
                    issueId,
                    agentId: lockedRun.agentId,
                    sourceRunId: lockedRun.id,
                  },
                  true,
                );
                if (proof.kind === "unresolved")
                  return { kind: "stale" as const, run: null };
                if (proof.kind === "stopped") {
                  const error =
                    "Automatic continuation stopped by the committed chat conversation close. Send a fresh request in chat or on the Board.";
                  const [cancelled] = await tx
                    .update(heartbeatRuns)
                    .set({
                      status: "cancelled",
                      errorCode: CHAT_CONTROL_RECOVERY_STOP_CODE,
                      error,
                      finishedAt: claimedAt,
                      resultJson: {
                        ...parseObject(lockedRun.resultJson),
                        automaticRecovery: {
                          code: CHAT_CONTROL_RECOVERY_STOP_CODE,
                          providerDispatched: false,
                          sourceRunId: proof.sourceRunId,
                          conversationId: proof.conversationId,
                          publicationId: proof.publicationId,
                        },
                      },
                      updatedAt: claimedAt,
                    })
                    .where(
                      and(
                        eq(heartbeatRuns.id, lockedRun.id),
                        eq(heartbeatRuns.status, "queued"),
                      ),
                    )
                    .returning();
                  if (!cancelled) return { kind: "stale" as const, run: null };
                  await tx
                    .update(agentWakeupRequests)
                    .set({
                      status: "skipped",
                      error,
                      finishedAt: claimedAt,
                      updatedAt: claimedAt,
                    })
                    .where(eq(agentWakeupRequests.id, wake.id));
                  await tx
                    .update(issues)
                    .set({
                      executionRunId: null,
                      executionAgentNameKey: null,
                      executionLockedAt: null,
                      updatedAt: claimedAt,
                    })
                    .where(
                      and(
                        eq(issues.id, issueId),
                        eq(issues.companyId, run.companyId),
                        eq(issues.executionRunId, run.id),
                      ),
                    );
                  return { kind: "cancelled" as const, run: cancelled };
                }
                await tx
                  .update(heartbeatRuns)
                  .set({
                    runnerProfileJson: {
                      ...parseObject(lockedRun.runnerProfileJson),
                      [CHAT_CONTROL_RECOVERY_ADMISSION_KEY]:
                        chatControlRecoveryAdmission(
                          lockedRun,
                          admission === "admitted" ? "admitted" : "required",
                        ),
                    },
                    updatedAt: claimedAt,
                  })
                  .where(eq(heartbeatRuns.id, lockedRun.id));
              }
              const authoritativeIds = queuedCommentIdsFromWakePayload(
                wake.payload,
              );
              if (authoritativeIds.length === 0) {
                // Legacy/direct comment wakes carry comment ids in their ordinary
                // payload and context, not in the authoritative queued-message
                // envelope. Preserve their established claim path; only an
                // explicitly bound queued-message envelope is subject to the
                // live-comment discard gate below.
                const [claimedRun] = await tx
                  .update(heartbeatRuns)
                  .set({
                    status: "running",
                    runnerProfileJson: sql`(case when jsonb_typeof(${heartbeatRuns.runnerProfileJson}) = 'object' then ${heartbeatRuns.runnerProfileJson} else '{}'::jsonb end) || ${JSON.stringify({ adapterDispatch: { adapterType: agent.adapterType } })}::jsonb`,
                    ...legacyControllerClaim(run.runtimeMode),
                    responsibleUserId,
                    startedAt: lockedRun.startedAt ?? claimedAt,
                    updatedAt: claimedAt,
                  })
                  .where(
                    and(
                      eq(heartbeatRuns.id, lockedRun.id),
                      eq(heartbeatRuns.status, "queued"),
                    ),
                  )
                  .returning();
                await bindClaimedIssueExecution(tx as unknown as Db, issueClaim.ownsIssue, claimedRun);
                return claimedRun
                  ? { kind: "claimed" as const, run: claimedRun }
                  : { kind: "stale" as const, run: null };
              }
              const commentRows = await tx
                .select({
                  id: issueComments.id,
                  deletedAt: issueComments.deletedAt,
                })
                .from(issueComments)
                .where(
                  and(
                    eq(issueComments.companyId, run.companyId),
                    eq(issueComments.issueId, issueId),
                    inArray(issueComments.id, authoritativeIds),
                  ),
                );
              const liveIds = authoritativeIds.filter((commentId) => {
                const comment = commentRows.find((row) => row.id === commentId);
                return Boolean(comment && !comment.deletedAt);
              });
              if (liveIds.length === 0) {
                const reason = "Queued messages were discarded before dispatch";
                const [cancelled] = await tx
                  .update(heartbeatRuns)
                  .set({
                    status: "cancelled",
                    finishedAt: claimedAt,
                    error: reason,
                    errorCode: "queued_comment_discarded",
                    updatedAt: claimedAt,
                  })
                  .where(
                    and(
                      eq(heartbeatRuns.id, lockedRun.id),
                      eq(heartbeatRuns.status, "queued"),
                    ),
                  )
                  .returning();
                await tx
                  .update(agentWakeupRequests)
                  .set({
                    status: "cancelled",
                    finishedAt: claimedAt,
                    error: reason,
                    updatedAt: claimedAt,
                  })
                  .where(eq(agentWakeupRequests.id, wake.id));
                await tx
                  .update(issues)
                  .set({
                    executionRunId: null,
                    executionAgentNameKey: null,
                    executionLockedAt: null,
                    updatedAt: claimedAt,
                  })
                  .where(
                    and(
                      eq(issues.id, issueId),
                      eq(issues.companyId, run.companyId),
                      eq(issues.executionRunId, run.id),
                    ),
                  );
                return {
                  kind: "cancelled" as const,
                  run: cancelled ?? lockedRun,
                };
              }

              await tx
                .update(agentWakeupRequests)
                .set({
                  status: "claimed",
                  claimedAt,
                  payload: withQueuedCommentIdsInWakePayload(
                    wake.payload,
                    liveIds,
                  ),
                  updatedAt: claimedAt,
                })
                .where(eq(agentWakeupRequests.id, wake.id));
              const [claimedRun] = await tx
                .update(heartbeatRuns)
                .set({
                  status: "running",
                  runnerProfileJson: sql`(case when jsonb_typeof(${heartbeatRuns.runnerProfileJson}) = 'object' then ${heartbeatRuns.runnerProfileJson} else '{}'::jsonb end) || ${JSON.stringify({ adapterDispatch: { adapterType: agent.adapterType } })}::jsonb`,
                    ...legacyControllerClaim(run.runtimeMode),
                  responsibleUserId,
                  startedAt: lockedRun.startedAt ?? claimedAt,
                  contextSnapshot: withQueuedCommentIdsInRunContext(
                    lockedRun.contextSnapshot,
                    liveIds,
                  ),
                  updatedAt: claimedAt,
                })
                .where(
                  and(
                    eq(heartbeatRuns.id, lockedRun.id),
                    eq(heartbeatRuns.status, "queued"),
                  ),
                )
                .returning();
              await bindClaimedIssueExecution(tx as unknown as Db, issueClaim.ownsIssue, claimedRun);
              return claimedRun
                ? { kind: "claimed" as const, run: claimedRun }
                : { kind: "stale" as const, run: null };
            })
            .catch((error) => {
              if (isExternalChatWaitAuthorizationContention(error))
                return { kind: "stale" as const, run: null };
              throw error;
            })
        : null;
    if (queuedCommentClaim?.kind === "cancelled") {
      await appendRunEvent(queuedCommentClaim.run, {
        eventType: "lifecycle",
        stream: "system",
        level: "warn",
        message:
          queuedCommentClaim.run.error ??
          "Queued messages were discarded before dispatch",
      });
      publishLiveEvent({
        companyId: queuedCommentClaim.run.companyId,
        type: "heartbeat.run.status",
        payload: {
          runId: queuedCommentClaim.run.id,
          agentId: queuedCommentClaim.run.agentId,
          status: queuedCommentClaim.run.status,
          invocationSource: queuedCommentClaim.run.invocationSource,
          triggerDetail: queuedCommentClaim.run.triggerDetail,
          error: queuedCommentClaim.run.error ?? null,
          errorCode: queuedCommentClaim.run.errorCode ?? null,
          startedAt: queuedCommentClaim.run.startedAt
            ? new Date(queuedCommentClaim.run.startedAt).toISOString()
            : null,
          finishedAt: queuedCommentClaim.run.finishedAt
            ? new Date(queuedCommentClaim.run.finishedAt).toISOString()
            : null,
        },
      });
      publishRunLifecyclePluginEvent(queuedCommentClaim.run);
      // Fire-and-forget: nothing else in this path depends on the emission,
      // so it must not delay the return.
      void emitAgentTaskRun(db, queuedCommentClaim.run);
      return null;
    }
    const claimed = queuedCommentClaim
      ? queuedCommentClaim.run
      : await withChatControlRecoveryGate(run, "claim", async (tx) => {
          const claimValues = {
            status: "running",
            runnerProfileJson: sql`(case when jsonb_typeof(${heartbeatRuns.runnerProfileJson}) = 'object' then ${heartbeatRuns.runnerProfileJson} else '{}'::jsonb end) || ${JSON.stringify({ adapterDispatch: { adapterType: agent.adapterType } })}::jsonb`,
            ...legacyControllerClaim(run.runtimeMode),
            responsibleUserId,
            startedAt: run.startedAt ?? claimedAt,
            updatedAt: claimedAt,
          };
          if (nativeReviewContext) {
            if (run.scheduledRetryReason === "native_provider_overloaded") {
              const predecessor = await lockIssueExecutionClaim(tx);
              if (predecessor.blocked) return null;
            }
            return claimQueuedNativeReviewRun(tx, {
              run, claimedAt, claimValues,
              agentNameKey: normalizeAgentNameKey(agent.name),
            });
          }
          return tx.transaction(async (claimTx) => {
            const issueClaim = await lockIssueExecutionClaim(claimTx as unknown as Db);
            if (issueClaim.blocked) return null;
            const claimedRun = await claimTx.update(heartbeatRuns).set(claimValues).where(and(
              eq(heartbeatRuns.id, run.id), eq(heartbeatRuns.status, "queued"),
            )).returning().then((rows) => rows[0] ?? null);
            await bindClaimedIssueExecution(claimTx as unknown as Db, issueClaim.ownsIssue, claimedRun);
            return claimedRun;
          });
        });
    if (!claimed) return null;

    publishLiveEvent({
      companyId: claimed.companyId,
      type: "heartbeat.run.status",
      payload: {
        runId: claimed.id,
        agentId: claimed.agentId,
        status: claimed.status,
        invocationSource: claimed.invocationSource,
        triggerDetail: claimed.triggerDetail,
        error: claimed.error ?? null,
        errorCode: claimed.errorCode ?? null,
        startedAt: claimed.startedAt
          ? new Date(claimed.startedAt).toISOString()
          : null,
        finishedAt: claimed.finishedAt
          ? new Date(claimed.finishedAt).toISOString()
          : null,
      },
    });
    publishRunLifecyclePluginEvent(claimed);

    if (!nativeReviewContext) {
      await setWakeupStatus(claimed.wakeupRequestId, "claimed", { claimedAt });
    }

    // Fix A (lazy locking): stamp executionRunId now that the run is actually running,
    // not at queue time. Guard is idempotent — safe if called more than once.
    const claimedContext = parseObject(claimed.contextSnapshot);
    const claimedIssueId = readNonEmptyString(claimedContext.issueId);
    const claimedWakeReason = readNonEmptyString(claimedContext.wakeReason);
    if (
      !nativeReviewContext && claimedIssueId &&
      claimedWakeReason !== "source_scoped_recovery_action"
    ) {
      const claimedAgent = await getAgent(claimed.agentId);
      await db
        .update(issues)
        .set({
          executionRunId: claimed.id,
          executionAgentNameKey: normalizeAgentNameKey(claimedAgent?.name),
          executionLockedAt: claimedAt,
          updatedAt: claimedAt,
        })
        .where(
          and(
            eq(issues.id, claimedIssueId),
            eq(issues.companyId, claimed.companyId),
            // Mention/context runs can touch an issue, but only the current assignee
            // owns the issue execution lock shown as the active run.
            eq(issues.assigneeAgentId, claimed.agentId),
            ["native_safe_replacement", "native_provider_overloaded"].includes(claimed.scheduledRetryReason ?? "")
              ? or(
                  isNull(issues.checkoutRunId),
                  eq(issues.checkoutRunId, claimed.id),
                )
              : undefined,
            or(
              isNull(issues.executionRunId),
              eq(issues.executionRunId, claimed.id),
            ),
          ),
        );
    }

    return claimed;
  }

  // startNextQueuedRunForAgent checks admission suppression once, then claims
  // runs (sets status "running"), then dispatches each to executeRun, which
  // checks suppression again before it does any work. Suppression (task
  // drain, worktree mode, a database restore) can start in the gap between
  // those two checks. When executeRun's check catches that, the run is
  // already claimed — release it back to "queued" so it does not keep a
  // running execution lock that nothing will ever process. This runs inside
  // the same promise startNextQueuedRunForAgent already tracks in
  // activeRunExecutionPromises, so getTaskDrainStatus() keeps reporting the
  // run as active until the release finishes.
  //
  // The run row, the wakeup request, and the issue execution lock all guard
  // the same claim, so one transaction commits all three writes together. A
  // partial write (for example the run flips to "queued" but the wakeup or
  // issue update then fails) would let the execution promise clear from
  // activeRunExecutionPromises while the wakeup stayed "claimed" or the
  // issue stayed locked to a queued run — task-drain status would then read
  // quiescent while the database still held part of the old claim.
  async function releaseRunClaimedJustBeforeSuppression(runId: string) {
    const now = new Date();
    await db.transaction(async (tx) => {
      const released = await tx
        .update(heartbeatRuns)
        .set({
          status: "queued",
          startedAt: null,
          responsibleUserId: null,
          updatedAt: now,
        })
        .where(
          and(eq(heartbeatRuns.id, runId), eq(heartbeatRuns.status, "running")),
        )
        .returning()
        .then((rows) => rows[0] ?? null);
      if (!released) return;

      if (released.wakeupRequestId) {
        await tx
          .update(agentWakeupRequests)
          .set({ status: "queued", claimedAt: null, updatedAt: now })
          .where(and(eq(agentWakeupRequests.id, released.wakeupRequestId), ne(agentWakeupRequests.status, "cancelled")));
      }

      const context = parseObject(released.contextSnapshot);
      const issueId = readNonEmptyString(context.issueId);
      if (issueId) {
        await tx
          .update(issues)
          .set({
            executionRunId: null,
            executionAgentNameKey: null,
            executionLockedAt: null,
            updatedAt: now,
          })
          .where(
            and(
              eq(issues.id, issueId),
              eq(issues.companyId, released.companyId),
              eq(issues.executionRunId, released.id),
            ),
          );
      }
    });
  }

  async function cancelQueuedRunForBlockedDependencies(
    run: typeof heartbeatRuns.$inferSelect,
    issueId: string,
    unresolvedBlockerIssueIds: string[],
  ) {
    const now = new Date();
    const reason =
      "Cancelled because issue dependencies are still blocked; Paperclip will wake the assignee when blockers resolve";
    const cancelled = await setRunStatus(run.id, "cancelled", {
      finishedAt: now,
      error: reason,
      errorCode: "issue_dependencies_blocked",
      resultJson: {
        ...parseObject(run.resultJson),
        stopReason: "issue_dependencies_blocked",
        effectiveTimeoutSec: 0,
        timeoutConfigured: false,
        timeoutSource: "dependency_gate",
        timeoutFired: false,
      },
    });
    if (!cancelled) return null;

    await setWakeupStatus(run.wakeupRequestId, "skipped", {
      finishedAt: now,
      error: reason,
    });

    await db
      .update(issues)
      .set({
        executionRunId: null,
        executionAgentNameKey: null,
        executionLockedAt: null,
        updatedAt: now,
      })
      .where(
        and(
          eq(issues.companyId, run.companyId),
          eq(issues.id, issueId),
          eq(issues.executionRunId, run.id),
        ),
      );

    await appendRunEvent(cancelled, {
      eventType: "lifecycle",
      stream: "system",
      level: "warn",
      message: reason,
      payload: {
        issueId,
        unresolvedBlockerIssueIds,
      },
    });

    return cancelled;
  }

  function truncateAgentErrorReason(
    reason: string | null | undefined,
  ): string | null {
    if (!reason) return null;
    const trimmed = reason.trim();
    if (!trimmed) return null;
    return trimmed.length > 500 ? `${trimmed.slice(0, 499)}…` : trimmed;
  }

  async function finalizeAgentStatus(
    agentId: string,
    outcome: "succeeded" | "interrupted" | "failed" | "cancelled" | "timed_out",
    failureReason?: string | null,
    options?: { keepIdleOnFailure?: boolean; wasFirstHeartbeat?: boolean },
  ) {
    const existing = await getAgent(agentId);
    if (!existing) return;

    if (existing.status === "paused" || existing.status === "terminated") {
      return;
    }

    const isFirstHeartbeat =
      options?.wasFirstHeartbeat ?? !existing.lastHeartbeatAt;

    const runningCount = await countRunningRunsForAgent(agentId);
    const nextStatus =
      runningCount > 0
        ? "running"
        : outcome === "succeeded" ||
            outcome === "interrupted" ||
            outcome === "cancelled" ||
            (outcome === "failed" && options?.keepIdleOnFailure)
          ? "idle"
          : "error";

    const updated = await db
      .update(agents)
      .set({
        status: nextStatus,
        // Persist a human-readable reason on the agent record when it enters
        // error so operators see it on the agent page without digging into run
        // events; clear it whenever the agent leaves error.
        errorReason:
          nextStatus === "error"
            ? truncateAgentErrorReason(failureReason)
            : null,
        lastHeartbeatAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(agents.id, agentId), eq(agents.lifecycleState, "ready")))
      .returning()
      .then((rows) => rows[0] ?? null);

    if (isFirstHeartbeat && updated) {
      const tc = getTelemetryClient();
      if (tc)
        trackAgentFirstHeartbeat(tc, {
          agentRole: updated.role,
          agentId: updated.id,
        });
    }

    if (updated) {
      publishLiveEvent({
        companyId: updated.companyId,
        type: "agent.status",
        payload: {
          agentId: updated.id,
          status: updated.status,
          lastHeartbeatAt: updated.lastHeartbeatAt
            ? new Date(updated.lastHeartbeatAt).toISOString()
            : null,
          outcome,
        },
      });
    }
  }

  async function reconcileStrandedAssignedIssues() {
    return recovery.reconcileStrandedAssignedIssues({
      issueCreatedAtGte: await getWorktreeExecutionCutoff(),
    });
  }

  async function sweepStaleIssueLocks() {
    return recovery.sweepStaleIssueLocks();
  }

  function issueIdFromRunContext(contextSnapshot: unknown) {
    const context = parseObject(contextSnapshot);
    return (
      readNonEmptyString(context.issueId) ?? readNonEmptyString(context.taskId)
    );
  }

  function issueIdFromWakePayload(payload: unknown) {
    const parsed = parseObject(payload);
    const nestedContext = parseObject(parsed[DEFERRED_WAKE_CONTEXT_KEY]);
    return (
      readNonEmptyString(parsed.issueId) ??
      readNonEmptyString(nestedContext.issueId) ??
      readNonEmptyString(nestedContext.taskId)
    );
  }

  async function scanSilentActiveRuns(opts?: {
    now?: Date;
    companyId?: string;
  }) {
    return recovery.scanSilentActiveRuns({
      ...opts,
      issueCreatedAtGte: await getWorktreeExecutionCutoff(),
    });
  }

  async function reconcileTaskWatchdogs(opts?: {
    companyId?: string | null;
    runId?: string | null;
  }) {
    return taskWatchdogs.reconcileTaskWatchdogs({
      ...opts,
      issueCreatedAtGte: await getWorktreeExecutionCutoff(),
    });
  }

  async function buildRunOutputSilence(
    run: Pick<
      typeof heartbeatRuns.$inferSelect,
      | "id"
      | "companyId"
      | "status"
      | "lastOutputAt"
      | "lastOutputSeq"
      | "lastOutputStream"
      | "processStartedAt"
      | "startedAt"
      | "createdAt"
    >,
    now = new Date(),
  ) {
    return recovery.buildRunOutputSilence(run, now);
  }

  async function reconcileResolvedDependencyWakes(opts?: {
    runId?: string | null;
    companyId?: string | null;
  }) {
    return recovery.reconcileResolvedDependencyWakeBackstop(opts);
  }

  async function updateRuntimeState(
    agent: typeof agents.$inferSelect,
    run: typeof heartbeatRuns.$inferSelect,
    result: AdapterExecutionResult,
    session: { legacySessionId: string | null },
    normalizedUsage?: UsageTotals | null,
  ) {
    await ensureRuntimeState(agent);
    const usage = normalizedUsage ?? normalizeUsageTotals(result.usage);
    const inputTokens = usage?.inputTokens ?? 0;
    const outputTokens = usage?.outputTokens ?? 0;
    const cachedInputTokens = usage?.cachedInputTokens ?? 0;
    const billingType = normalizeLedgerBillingType(result.billingType);
    const billedCostUsd = resolveCacheAdjustedCostUsd(result);
    const additionalCostCents = normalizeBilledCostCents(
      billedCostUsd,
      billingType,
    );
    const hasTokenUsage =
      inputTokens > 0 || outputTokens > 0 || cachedInputTokens > 0;
    const costStatus = resolveLedgerCostStatus({
      costUsd: billedCostUsd,
      inputTokens,
      cachedInputTokens,
      outputTokens,
    });
    const provider = result.provider ?? "unknown";
    const biller = resolveLedgerBiller(result);
    const ledgerScope = await resolveLedgerScopeForRun(
      db,
      agent.companyId,
      run,
    );

    await db
      .update(agentRuntimeState)
      .set({
        adapterType: agent.adapterType,
        sessionId: session.legacySessionId,
        lastRunId: run.id,
        lastRunStatus: run.status,
        lastError: run.error ?? null,
        totalInputTokens: sql`${agentRuntimeState.totalInputTokens} + ${inputTokens}`,
        totalOutputTokens: sql`${agentRuntimeState.totalOutputTokens} + ${outputTokens}`,
        totalCachedInputTokens: sql`${agentRuntimeState.totalCachedInputTokens} + ${cachedInputTokens}`,
        totalCostCents: sql`${agentRuntimeState.totalCostCents} + ${additionalCostCents}`,
        updatedAt: new Date(),
      })
      .where(eq(agentRuntimeState.agentId, agent.id));

    if (additionalCostCents > 0 || hasTokenUsage) {
      const costs = costService(db, budgetHooks);
      await costs.createEvent(agent.companyId, {
        heartbeatRunId: run.id,
        agentId: agent.id,
        issueId: ledgerScope.issueId,
        projectId: ledgerScope.projectId,
        billingCode: ledgerScope.billingCode,
        provider,
        biller,
        billingType,
        costStatus,
        model: result.model ?? "unknown",
        inputTokens,
        cachedInputTokens,
        outputTokens,
        costCents: additionalCostCents,
        occurredAt: new Date(),
      });
    }
  }

  // A 403 from claimQueuedRun comes from the run's own persisted identity
  // (an unverifiable interrupt receipt, a manual wake with no user). Those rows
  // do not change, so the claim fails the same way on every pass and restart.
  function isPermanentClaimRejection(err: unknown): err is HttpError {
    return err instanceof HttpError && err.status === 403;
  }

  // Other 4xx rejections can clear later (a responsible user gets assigned, a
  // conflicting claim finishes). Keep the run queued, but do not let it stop
  // the rest of the queue or startup recovery.
  function isDeferrableClaimRejection(err: unknown): err is HttpError {
    return err instanceof HttpError && err.status >= 400 && err.status < 500;
  }

  // Settle runs that can never be claimed. Letting the error escape stalls the
  // agent's queue and, during startup recovery, stops the server from booting.
  async function cancelRejectedQueuedRuns(
    rejected: Array<{ run: typeof heartbeatRuns.$inferSelect; err: HttpError }>,
  ) {
    for (const { run, err } of rejected) {
      logger.warn(
        { err, runId: run.id, agentId: run.agentId, companyId: run.companyId },
        "cancelling queued heartbeat run whose claim was rejected",
      );
      try {
        await cancelRunInternal(
          run.id,
          `Cancelled because the queued run cannot be claimed: ${err.message}`,
          { errorCode: "queued_run_claim_rejected" },
        );
      } catch (cancelErr) {
        logger.error(
          { err: cancelErr, runId: run.id },
          "failed to cancel queued heartbeat run whose claim was rejected; it stays queued for the next recovery pass",
        );
      }
    }
  }

  async function startNextQueuedRunForAgent(agentId: string) {
    if ((await getSchedulingSuppression()).suppressed) return [];
    const cutoff = await getWorktreeExecutionCutoff();
    // Cancelled after the start lock is released: cancelRunInternal promotes the
    // agent's next queued run, which takes this same lock.
    const rejectedClaims: Array<{ run: typeof heartbeatRuns.$inferSelect; err: HttpError }> = [];

    return withAgentStartLock(agentId, async () => {
      const agent = await getAgent(agentId);
      if (!agent) return [];
      const invokability = await getAgentInvokability(agent);
      if (!invokability.invokable) {
        if (shouldCancelRunsForNonInvokableAgent(invokability)) {
          await cancelActiveForAgentInternal(
            agentId,
            `Cancelled because the agent is not invokable: ${invokability.reason}`,
          );
        }
        return [];
      }
      const policy = parseHeartbeatPolicy(agent);
      const runningCount = await countRunningRunsForAgent(agentId);
      let availableSlots = Math.max(
        0,
        policy.maxConcurrentRuns - runningCount,
      );
      if (availableSlots <= 0) return [];
      if (Object.keys(adapterConcurrencyLimits).length > 0) {
        availableSlots = await reserveAdapterConcurrencySlots(
          agent.adapterType,
          availableSlots,
        );
        if (availableSlots <= 0) return [];
      }

      const queuedRuns = await db
        .select()
        .from(heartbeatRuns)
        .where(
          and(
            eq(heartbeatRuns.agentId, agentId),
            eq(heartbeatRuns.status, "queued"),
            cutoff ? gte(heartbeatRuns.createdAt, cutoff) : undefined,
          ),
        )
        .orderBy(asc(heartbeatRuns.createdAt));
      if (queuedRuns.length === 0) return [];

      const dependencyReadiness = await listQueuedRunDependencyReadiness(
        agent.companyId,
        queuedRuns,
      );
      const queuedIssueIds = [
        ...new Set(
          queuedRuns
            .map((run) =>
              readNonEmptyString(parseObject(run.contextSnapshot).issueId),
            )
            .filter((issueId): issueId is string => Boolean(issueId)),
        ),
      ];
      const issueRows = await db
        .select({
          id: issues.id,
          status: issues.status,
          priority: issues.priority,
        })
        .from(issues)
        .where(
          queuedIssueIds.length > 0
            ? and(
                eq(issues.companyId, agent.companyId),
                inArray(issues.id, queuedIssueIds),
              )
            : sql`false`,
        );
      const issueById = new Map(issueRows.map((row) => [row.id, row]));
      const companyAgents = await listCompanyAgentOrgRows(agent.companyId);
      const prioritizedRuns = [...queuedRuns].sort((left, right) => {
        const leftIssueId = readNonEmptyString(
          parseObject(left.contextSnapshot).issueId,
        );
        const rightIssueId = readNonEmptyString(
          parseObject(right.contextSnapshot).issueId,
        );
        const leftReadiness = leftIssueId
          ? dependencyReadiness.get(leftIssueId)
          : null;
        const rightReadiness = rightIssueId
          ? dependencyReadiness.get(rightIssueId)
          : null;
        const leftReady = leftIssueId
          ? (leftReadiness?.isDependencyReady ?? true)
          : true;
        const rightReady = rightIssueId
          ? (rightReadiness?.isDependencyReady ?? true)
          : true;
        const leftIssue = leftIssueId ? issueById.get(leftIssueId) : null;
        const rightIssue = rightIssueId ? issueById.get(rightIssueId) : null;
        const leftRank = leftIssueId
          ? leftReady
            ? leftIssue?.status === "in_progress"
              ? 0
              : 1
            : 3
          : 2;
        const rightRank = rightIssueId
          ? rightReady
            ? rightIssue?.status === "in_progress"
              ? 0
              : 1
            : 3
          : 2;
        if (leftRank !== rightRank) return leftRank - rightRank;
        const leftPriorityRank = issueRunPriorityRank(leftIssue?.priority);
        const rightPriorityRank = issueRunPriorityRank(rightIssue?.priority);
        if (leftPriorityRank !== rightPriorityRank)
          return leftPriorityRank - rightPriorityRank;
        return left.createdAt.getTime() - right.createdAt.getTime();
      });

      const claimedRuns: Array<typeof heartbeatRuns.$inferSelect> = [];
      for (const queuedRun of prioritizedRuns) {
        if (claimedRuns.length >= availableSlots) break;
        let claimed: typeof heartbeatRuns.$inferSelect | null;
        try {
          claimed = await claimQueuedRun(queuedRun, companyAgents);
        } catch (err) {
          if (isPermanentClaimRejection(err)) {
            rejectedClaims.push({ run: queuedRun, err });
            continue;
          }
          if (!isDeferrableClaimRejection(err)) throw err;
          logger.warn(
            { err, runId: queuedRun.id, agentId: queuedRun.agentId, companyId: queuedRun.companyId },
            "queued heartbeat run claim was rejected; leaving it queued for the next recovery pass",
          );
          continue;
        }
        if (claimed) claimedRuns.push(claimed);
      }
      if (claimedRuns.length === 0) return [];

      for (const claimedRun of claimedRuns) {
        const execution = executeRun(claimedRun.id).catch((err) => {
          logger.error(
            { err, runId: claimedRun.id },
            "queued heartbeat execution failed",
          );
        });
        // Register the in-flight execution so drainActiveRunExecutions() can await
        // it. executeRun resolves only after its finally block finishes flushing
        // run rows/events, so awaiting this promise guarantees the run's writes
        // have landed before a caller (e.g. a test's afterEach) mutates the DB.
        activeRunExecutionPromises.add(execution);
        void execution.finally(() => {
          // drainActiveRunExecutions loops on activeRunExecutionPromises.size,
          // so an entry that never clears here would hang it forever.
          activeRunExecutionPromises.delete(execution);
        });
      }
      return claimedRuns;
    }).finally(() => cancelRejectedQueuedRuns(rejectedClaims));
  }

  // Await every background heartbeat execution that is currently in flight. A
  // draining run can, in its finally block, promote and dispatch the next queued
  // run for the same agent — that follow-up execution is registered in the set
  // before the parent promise settles, so we loop until the set is empty rather
  // than snapshotting once. Callers use this to guarantee no run is still
  // writing rows/events (graceful shutdown, deterministic test teardown).
  //
  // Await in-flight wakeup promises first. A wakeup resolves only after it
  // registers its run execution, so a wake that is still before run registration
  // is invisible to activeRunExecutionPromises alone. Awaiting the wakeup promise
  // closes that window: once it settles, any run it dispatched is already in
  // activeRunExecutionPromises, and the second await drains that run. A wakeup or
  // a run can add more entries as it settles, so loop until both sets are empty.
  async function drainActiveRunExecutions() {
    for (const timer of nativeSessionResumeDispatchTimers.values()) {
      clearTimeout(timer);
    }
    nativeSessionResumeDispatchTimers.clear();
    while (
      activeWakeupPromises.size > 0 ||
      activeRunExecutionPromises.size > 0
    ) {
      await Promise.allSettled([...activeWakeupPromises]);
      await Promise.all([...activeRunExecutionPromises]);
    }
  }

  function scheduleNativeSessionResumeDispatch(
    runId: string,
    nextAttemptAt: Date,
  ) {
    const prior = nativeSessionResumeDispatchTimers.get(runId);
    if (prior) clearTimeout(prior);
    const delayMs = Math.max(0, nextAttemptAt.getTime() - Date.now());
    const timer = setTimeout(() => {
      if (nativeSessionResumeDispatchTimers.get(runId) !== timer) return;
      nativeSessionResumeDispatchTimers.delete(runId);
      void (async () => {
        if ((await getSchedulingSuppression()).suppressed) return;
        await dispatchNativeSessionResumptions({
          db,
          runnerInstanceId:
            runtimeEnv.PAPERCLIP_INSTANCE_ID?.trim() || "paperclip-heartbeat",
          runIds: [runId],
          dispatch: (claim) => {
            const execution = executeRun(claim.runId, {
              nativeLeaseOwner: claim.leaseOwner,
            }).catch((error) => {
              logger.error(
                { err: error, runId: claim.runId },
                "scheduled native session resume failed",
              );
            });
            activeRunExecutionPromises.add(execution);
            void execution.finally(() =>
              activeRunExecutionPromises.delete(execution),
            );
          },
        });
      })().catch((error) => {
        logger.error(
          { err: error, runId },
          "failed to dispatch scheduled native session resume",
        );
      });
    }, delayMs);
    timer.unref?.();
    nativeSessionResumeDispatchTimers.set(runId, timer);
  }

  const runCompletion = createHeartbeatRunCompletion(db, {
    getRun,
    getAgent,
    resolveNormalizedUsageForSession,
    clearTaskSessions,
    upsertTaskSession,
    mergeRunStopMetadataForAgent,
    setRunStatusIfRunning,
    setWakeupStatus,
    appendRunEvent,
    classifyAndPersistRunLiveness,
    completeSkillTestRunForHeartbeatOutcome,
    refreshContinuationSummaryForRun,
    findRunIssueComment,
    findLatestCompletedFinalAgentMessage,
    parseMaxTurnContinuationPolicy,
    finalizeIssueCommentPolicy,
    handleIssueReviewPathDisposition,
    handleRunLivenessContinuation,
    handleSuccessfulRunHandoff,
    updateRuntimeState,
    scheduleBoundedRetryForRun,
    scheduleInteractionContinuationInfrastructureRetryIfEligible,
    timerClaimWasFirstHeartbeat,
    releaseIssueExecutionAndPromote,
    finalizeAgentStatus,
    enqueueWakeup,
    issuesSvc,
    recovery,
    getCurrentUserRedactionOptions,
    budgetHooks,
    runLogStore,
    traceStore,
    processRunCancellationSettlements,
    failedProcessRunCancellations,
  });

  async function executeRun(
    runId: string,
    runOptions: {
      nativeLeaseOwner?: string;
      nativeRestartRecovery?: NativeRestartRecoveryClaim;
    } = {},
  ) {
    const attemptStartedAtMs = Date.now();
    let attestedQuestionResponseAtMs: number | null = null;
    if ((await getSchedulingSuppression()).suppressed) {
      try {
        await releaseRunClaimedJustBeforeSuppression(runId);
      } catch (err) {
        logger.error(
          { err, runId },
          "failed to release run claimed just before task-drain suppression; the run row stays running, and the orphan reaper finalizes it and releases the issue lock on its next cycle",
        );
      }
      return;
    }

    let legacyAdapterEntered = false;
    let persistUsageCaptureFailure: (() => Promise<void>) | undefined;
    let run = await getRun(runId);
    if (!run) return;
    if (run.status !== "queued" && run.status !== "running") return;

    if (run.status === "queued") {
      const claimed = await claimQueuedRun(run);
      if (!claimed) {
        // claimQueuedRun can also leave the run queued when dependencies are unresolved.
        return;
      }
      run = claimed;
    }

    const instructionCleanupRun = run;
    let instructionCleanupDeferred = false;
    const releaseInstructionCopy = async () => {
      // Cleanup is retried from the durable working-copy receipt by the
      // recovery sweep. It must not replace the provider result (or prevent
      // lease release), and a timeout must not be repeated in outer teardown.
      if (instructionCleanupDeferred) return;
      try {
        await instructionCopies.release(instructionCleanupRun.companyId, instructionCleanupRun.id);
      } catch (err) {
        instructionCleanupDeferred = true;
        logger.warn({ err, runId: instructionCleanupRun.id }, "Agent file cleanup deferred; run outcome preserved");
        await appendRunEvent(instructionCleanupRun, {
          eventType: "instruction_cleanup",
          stream: "system",
          level: "warn",
          message: "Agent file cleanup was deferred. The run outcome and file-save receipt are unchanged.",
          payload: { state: "deferred" },
        }).catch((eventError) => {
          logger.warn({ err: eventError, runId: instructionCleanupRun.id }, "Failed to record deferred agent file cleanup");
        });
      }
    };

    if (
      runOptions.nativeLeaseOwner &&
      run.runtimeMode === "native" &&
      runOptions.nativeRestartRecovery?.kind !== "reattach_existing_runner" &&
      runOptions.nativeRestartRecovery?.kind !== "reattach_remote_runner"
    ) {
      // A numeric PID or process-group ID is a liveness signal, never an
      // ownership capability: the OS may have recycled it after the service
      // restart. A still-active in-memory child handle is also insufficient to
      // authorize recovery to kill it. Any live or active-looking process
      // therefore blocks replacement recovery without receiving a signal.
      const tracked = runningProcesses.get(run.id);
      const trackedChildIsActive =
        !!tracked &&
        tracked.child.exitCode === null &&
        tracked.child.signalCode === null;
      const trackedPid = tracked?.child.pid ?? null;
      const trackedProcessGroupId = tracked?.processGroupId ?? null;
      const trackedPidAlive = trackedPid ? isProcessAlive(trackedPid) : false;
      const trackedProcessGroupAlive = trackedProcessGroupId
        ? isProcessGroupAlive(trackedProcessGroupId)
        : false;
      const persistedPidAlive =
        !!run.processPid && isProcessAlive(run.processPid);
      const persistedProcessGroupAlive =
        !!run.processGroupId && isProcessGroupAlive(run.processGroupId);
      if (
        trackedChildIsActive ||
        trackedPidAlive ||
        trackedProcessGroupAlive ||
        persistedPidAlive ||
        persistedProcessGroupAlive
      ) {
        await markNativeOwnershipUnverified(run, {
          reason: "live_process_identifier",
          processPidAlive: trackedPidAlive || persistedPidAlive,
          processGroupAlive:
            trackedProcessGroupAlive || persistedProcessGroupAlive,
        });
        throw new Error(NATIVE_OWNERSHIP_UNVERIFIED_ERROR_CODE);
      }
      runningProcesses.delete(run.id);
      if (run.processPid || run.processGroupId || run.processStartedAt) {
        const cleared = await db.transaction(async tx => {
          const cleared = await tx
            .update(heartbeatRuns)
            .set({
              processPid: null,
              processGroupId: null,
              processStartedAt: null,
              updatedAt: new Date(),
            })
            .where(
              and(
                eq(heartbeatRuns.id, run.id),
                eq(heartbeatRuns.runtimeMode, "native"),
                run.processPid === null
                  ? isNull(heartbeatRuns.processPid)
                  : eq(heartbeatRuns.processPid, run.processPid),
                run.processGroupId === null
                  ? isNull(heartbeatRuns.processGroupId)
                  : eq(heartbeatRuns.processGroupId, run.processGroupId),
                run.processStartedAt === null
                  ? isNull(heartbeatRuns.processStartedAt)
                  : eq(heartbeatRuns.processStartedAt, run.processStartedAt),
              ),
            )
            .returning()
            .then((rows) => rows[0] ?? null);
          if (cleared) await recordNativeLocalProcessStop(tx as unknown as Db, run);
          return cleared;
        });
        if (!cleared) {
          const current = await getRun(run.id);
          if (current) {
            await markNativeOwnershipUnverified(current, {
              reason: "live_process_identifier",
            });
          }
          throw new Error(NATIVE_OWNERSHIP_UNVERIFIED_ERROR_CODE);
        }
        run = cleared;
      }
    }

    if (run.runtimeMode === "legacy" && run.controllerBootId &&
        run.controllerBootId !== legacyControllerBootId) return;
    activeRunExecutions.add(run.id);
    const executionControl = createAdapterExecutionControl();
    // This coarse scope also covers host finalization after the adapter returns.
    // Nested scopes refine the label without making any termination claim.
    executionControl.phases.enter("host_execution");
    const executionPhaseContext = { onExecutionPhase: executionControl.phases.enter };
    const controllerLease = watchLegacyControllerLease(db, run, executionControl.controller);
    let runScratch: HeartbeatRunScratch | null = null;
    let githubLauncherLocation:
      Parameters<typeof cleanupGitHubOperationLaunchers>[0] | null = null;
    let nativeSessionResumeScheduled = false;
    let nativeOwnershipHeld = false;
    let releaseWarmInstructionPreparation: (() => Promise<void>) | null = null;
    let nativeInstructionReservation: Awaited<ReturnType<typeof reserveWarmNativeInstructionDirectory>> = null;
    let nativeDispatchStarted = false;
    let nativeWorkspaceFinalizeScheduled = false;
    let nativeWorkspaceSync: Awaited<
      ReturnType<typeof prepareNativeWorkspaceSync>
    > = null;
    let requiredWorkspaceRestoreEvidence: Record<string, unknown> | null = null;
    let providerResourceDispositionForRun:
      ProviderResourceDisposition | undefined;
    let nativeLifecycleTelemetryForRun:
      | {
          provider: string;
          harness: string;
          lifecycleMode: "per_turn" | "warm";
          sandboxResource:
            "keep_running" | "stop_and_reuse" | "destroy_after_turn";
        }
      | undefined;
    let managedAiRuntime: Awaited<ReturnType<typeof prepareManagedAiRuntime>> | undefined;
    let providerTraceCapture: Awaited<
      ReturnType<typeof traceStore.prepare>
    > | null = null;
    let providerTraceFinalized = false;
    let readFailureReportSecrets: () => string[] = () => [];
    let identityRedactor = createAgentIdentityRedactor();

    try {
      let agent = await getAgent(run.agentId);
      if (!agent) {
        await setRunStatus(runId, "failed", {
          error: "Agent not found",
          errorCode: "agent_not_found",
          finishedAt: new Date(),
        });
        await setWakeupStatus(run.wakeupRequestId, "failed", {
          finishedAt: new Date(),
          error: "Agent not found",
        });
        const failedRun = await getRun(runId);
        if (failedRun) await releaseIssueExecutionAndPromote(failedRun);
        return;
      }

      // The claimed adapter identity is immutable recovery evidence. Do not
      // execute a newly selected adapter under a previous adapter's claim.
      const selectedAdapter = claimedAdapterType(run);
      if (selectedAdapter && selectedAdapter !== agent.adapterType) {
        throw new Error("Agent adapter changed during startup; start a new turn with the updated agent.");
      }

      const dispatchIssueId = readNonEmptyString(parseObject(run.contextSnapshot).issueId);
      const resumingAdmittedConversationTurn = !!runOptions.nativeLeaseOwner
        && typeof run.contextSnapshot?.conversationSessionGeneration === "number";
      if (dispatchIssueId && isConversation(await getIssueExecutionContext(run.companyId, dispatchIssueId))
        && !resumingAdmittedConversationTurn && !(await instanceSettings.getExperimental()).enableAgentChat) {
        await setRunStatus(run.id, "cancelled", { finishedAt: new Date(), error: "Agent Chat is disabled", errorCode: "agent_chat_disabled" });
        await setWakeupStatus(run.wakeupRequestId, "cancelled", { finishedAt: new Date() });
        await releaseIssueExecutionAndPromote((await getRun(run.id))!, { suppressImmediateRecovery: true });
        await finalizeAgentStatus(agent.id, "cancelled");
        return;
      }
      run = await prepareChatCompletionTurn(db, run);
      const preparedConversation = await prepareConversationTurn(db, run);
      run = { ...run, contextSnapshot: preparedConversation.context };
      if (preparedConversation.reset) {
        const contextSnapshot = { ...preparedConversation.context, conversationReset: true };
        await setRunStatus(run.id, "succeeded", { finishedAt: new Date(), contextSnapshot, resultJson: { conversationReset: true }, issueCommentStatus: "not_applicable" });
        await setWakeupStatus(run.wakeupRequestId, "completed", { finishedAt: new Date() });
        const resetRun = (await getRun(run.id))!;
        await settleConversationTurn(db, resetRun);
        await appendRunEvent(resetRun, { eventType: "lifecycle", stream: "system", level: "info", message: "New conversation session" });
        await releaseIssueExecutionAndPromote(resetRun, { suppressImmediateRecovery: true });
        await finalizeAgentStatus(agent.id, "succeeded");
        return;
      }
      const runtime = await ensureRuntimeState(agent);
      const context = parseObject(run.contextSnapshot);
      const authorizeFailedChatRetryExecution = () =>
        db.transaction((tx) =>
          authorizeFailedChatRunRetryWake(db, tx as unknown as Db, {
            phase: "execution",
            wakeupRequestId: run.wakeupRequestId,
            companyId: run.companyId,
            agentId: run.agentId,
            issueId: readNonEmptyString(context.issueId),
            runId: run.id,
            contextSnapshot: context,
          }),
        );
      const isFailedChatRunRetry = await authorizeFailedChatRetryExecution();
      // Never adopt a chat-execution attestation supplied in a wake payload.
      // Reviewed chat turns rebuild it from the current durable owner below.
      delete context[PAPERCLIP_EXTERNAL_CHAT_EXECUTION_BOUND_KEY];
      delete context[EXTERNAL_CHAT_QUESTION_RESPONSE_KEY];
      const providerTraceRequested =
        parseObject(context.debug).providerTrace === "raw";
      if (providerTraceRequested) {
        if (context.providerTraceRequestSource === "agent_debug_setting") {
          try {
            await logActivity(db, {
              companyId: run.companyId,
              actorType: "system",
              actorId: "system",
              agentId: run.agentId,
              runId: run.id,
              action: "provider_trace.capture_requested",
              entityType: "heartbeat_run",
              entityId: run.id,
              details: {
                mode: "raw",
                source: "agent_debug_setting",
                retentionHours: 24,
                maxBytes: 64 * 1024 * 1024,
              },
            });
          } catch (error) {
            logger.warn(
              { error, runId: run.id },
              "provider trace capture audit could not be recorded",
            );
          }
        }
        try {
          providerTraceCapture = await traceStore.prepare({
            runId: run.id,
            companyId: run.companyId,
            provider:
              readNonEmptyString(parseObject(agent.adapterConfig).provider) ??
              agent.adapterType,
            requestedBy:
              readNonEmptyString(context.providerTraceRequestedBy) ??
              "local-admin",
          });
        } catch (error) {
          logger.warn(
            { error, runId: run.id },
            "provider trace sidecar could not be prepared",
          );
        }
      }
      const taskKey = deriveTaskKeyWithHeartbeatFallback(context, null);
      const sessionCodec = getAdapterSessionCodec(agent.adapterType);
      const issueId = readNonEmptyString(context.issueId);
      let issueContext = issueId
        ? await getIssueExecutionContext(agent.companyId, issueId)
        : null;
      const issueDependencyReadiness = issueId
        ? await issuesSvc
            .listDependencyReadiness(agent.companyId, [issueId])
            .then((rows) => rows.get(issueId) ?? null)
        : null;
      if (
        issueId &&
        issueContext &&
        isResolvedInteractionContinuationWakeContext(context)
      ) {
        try {
          // Claim the issue under the same active-status predicate used by the
          // queued-run staleness gate. This is the final atomic guard before
          // dispatch: an operator parking the issue after claim but before this
          // checkout must not be overwritten by the continuation.
          await issuesSvc.checkout(
            issueId,
            agent.id,
            [...resolvedInteractionCheckoutExpectedStatuses()],
            run.id,
          );
          context[PAPERCLIP_HARNESS_CHECKOUT_KEY] = true;
        } catch (error) {
          if (!isCheckoutConflictError(error)) throw error;
          const staleness = await runDispatch.cancelStaleQueuedRun({
            runId: run.id,
            companyId: run.companyId,
            expectedStatus: "running",
          });
          if (staleness.outcome === "cancelled") {
            applyRunDispatchPostCommitEffects(staleness.postCommitEffects);
            return;
          }
          throw error;
        }
        issueContext = await getIssueExecutionContext(agent.companyId, issueId);
      }
      if (
        issueId &&
        issueContext &&
        !isResolvedInteractionContinuationWakeContext(context) &&
        shouldAutoCheckoutIssueForWake({
          contextSnapshot: context,
          issueStatus: issueContext.status,
          issueAssigneeAgentId: issueContext.assigneeAgentId,
          issueExecutionState: issueContext.executionState,
          isDependencyReady:
            issueDependencyReadiness?.isDependencyReady ?? true,
          agentId: agent.id,
        })
      ) {
        try {
          await issuesSvc.checkout(
            issueId,
            agent.id,
            ["todo", "backlog", "blocked"],
            run.id,
          );
          context[PAPERCLIP_HARNESS_CHECKOUT_KEY] = true;
        } catch (error) {
          if (!isCheckoutConflictError(error)) throw error;
          context[PAPERCLIP_HARNESS_CHECKOUT_KEY] = false;
        }
        issueContext = await getIssueExecutionContext(agent.companyId, issueId);
      }
      if (
        issueId &&
        ((issueContext?.status === "in_review" &&
          CHAT_PROVIDERS.some(
            (provider) =>
              context.source === `chat:${provider}` ||
              context.source === `chat:${provider}:recovery`,
          )) ||
          (context.source === "issue.interaction.respond" &&
            context.externalChatContinuation === true &&
            context.interactionKind === "ask_user_questions" &&
            ["in_progress", "in_review"].includes(issueContext?.status ?? "")))
      ) {
        const attested = await attestReviewedExternalChatRun({
          db,
          companyId: agent.companyId,
          agentId: agent.id,
          issueId,
          runId: run.id,
          contextSnapshot: context,
          onQuestionResponseAttested: (answeredAtMs) => {
            attestedQuestionResponseAtMs = answeredAtMs;
          },
        });
        if (!attested)
          throw new Error("reviewed_chat_execution_binding_not_authorized");
        context[PAPERCLIP_EXTERNAL_CHAT_EXECUTION_BOUND_KEY] = true;
      }
      const wakeCommentId = deriveCommentId(context, null);
      const wakeCommentContext =
        issueContext && wakeCommentId
          ? await db
              .select({
                id: issueComments.id,
                body: issueComments.body,
                authorType: issueComments.authorType,
                authorAgentId: issueComments.authorAgentId,
                authorUserId: issueComments.authorUserId,
                presentation: issueComments.presentation,
                metadata: issueComments.metadata,
                deletedAt: issueComments.deletedAt,
                deletedByType: issueComments.deletedByType,
                deletedByAgentId: issueComments.deletedByAgentId,
                deletedByUserId: issueComments.deletedByUserId,
                deletedByRunId: issueComments.deletedByRunId,
                sourceTrust: issueComments.sourceTrust,
              })
              .from(issueComments)
              .where(
                and(
                  eq(issueComments.id, wakeCommentId),
                  eq(issueComments.issueId, issueContext.id),
                  eq(issueComments.companyId, agent.companyId),
                ),
              )
              .then((rows) => {
                const row = rows[0] ?? null;
                return row?.deletedAt
                  ? {
                      ...row,
                      body: "",
                      presentation: null,
                      metadata: null,
                    }
                  : row;
              })
          : null;
      let issueAssigneeOverrides =
        issueContext && issueContext.assigneeAgentId === agent.id
          ? parseIssueAssigneeAdapterOverrides(
              issueContext.assigneeAdapterOverrides,
            )
          : null;
      const experimentalInstanceSettings =
        await instanceSettings.getExperimental();
      const isolatedWorkspacesEnabled =
        experimentalInstanceSettings.enableIsolatedWorkspaces;
      // Inert on its own: the operator default only reaches the resolver when
      // isolated workspaces are enabled at all, so a stack that has one flag
      // without the other keeps its current behavior.
      const defaultIsolatedWorkspacesEnabled =
        isolatedWorkspacesEnabled &&
        experimentalInstanceSettings.enableIsolatedWorkspacesByDefault;
      const parsedIssueExecutionWorkspaceSettings =
        parseIssueExecutionWorkspaceSettings(
          issueContext?.executionWorkspaceSettings,
        );
      const issueExecutionWorkspaceSettings = isolatedWorkspacesEnabled
        ? parsedIssueExecutionWorkspaceSettings
        : null;
      const environmentExecutionWorkspaceSettings =
        selectEnvironmentExecutionWorkspaceSettings(
          parsedIssueExecutionWorkspaceSettings,
          isolatedWorkspacesEnabled,
        );
      const contextProjectId = readNonEmptyString(context.projectId);
      const executionProjectId = issueContext?.projectId ?? contextProjectId;
      const projectContext = executionProjectId
        ? await db
            .select({
              id: projects.id,
              executionWorkspacePolicy: projects.executionWorkspacePolicy,
              hasWorkspace: exists(
                db.select({ id: projectWorkspaces.id })
                  .from(projectWorkspaces)
                  .where(and(
                    eq(projectWorkspaces.projectId, projects.id),
                    eq(projectWorkspaces.companyId, agent.companyId),
                  )),
              ).mapWith(Boolean),
              env: projects.env,
              updatedAt: projects.updatedAt,
            })
            .from(projects)
            .where(
              and(
                eq(projects.id, executionProjectId),
                eq(projects.companyId, agent.companyId),
              ),
            )
            .then((rows) => rows[0] ?? null)
        : null;
      const acceptedPlanContinuationWake = issueContext && !isConversation(issueContext)
        ? readNonEmptyString(context.workspaceRefreshReason) ===
            "accepted_plan_confirmation" ||
          (issueContext.workMode === "planning" &&
            readNonEmptyString(context.interactionKind) ===
              "request_confirmation" &&
            readNonEmptyString(context.interactionStatus) === "accepted")
        : false;
      const acceptedPlanWakeRoutingDecision = issueContext
        ? await resolveAcceptedPlanWakeRoutingDecision({
            db,
            companyId: agent.companyId,
            agentId: agent.id,
            issueId,
            acceptedPlanContinuationWake,
            contextSnapshot: context,
          })
        : null;
      if (acceptedPlanWakeRoutingDecision) {
        context.forceFreshSession = true;
        context.acceptedPlanWakeRouting = {
          reason: "other_issue_claim_in_flight",
          otherActiveClaimIssueId:
            acceptedPlanWakeRoutingDecision.otherActiveClaimIssueId,
          otherActiveClaimIdentifier:
            acceptedPlanWakeRoutingDecision.otherActiveClaimIdentifier,
          otherActiveClaimTitle:
            acceptedPlanWakeRoutingDecision.otherActiveClaimTitle,
        };
        if (acceptedPlanWakeRoutingDecision.suppressAcceptedContinuation) {
          clearInteractionContinuationWakeContext(context);
          delete context.workspaceRefreshReason;
        }
      } else {
        delete context.acceptedPlanWakeRouting;
      }
      const routineEnvContext = await getRoutineEnvForExecutionIssue(
        agent.companyId,
        issueContext,
      );
      let responsibleUserId: string | null =
        await resolveResponsibleUserIdForRun({
          run,
          contextSnapshot: context,
          issueContext,
          routineEnvContext,
        });
      const identityContext = await initializeRunIdentity(db, {
        companyId: agent.companyId,
        runId: run.id,
        responsibleUserId,
        interactionId: readNonEmptyString(context.interactionId),
        issueId,
        messageIds:
          run.retryOfRunId || context.retryOfRunId
            ? []
            : queuedCommentIdsFromRunContext(context).length
              ? queuedCommentIdsFromRunContext(context)
              : Array.isArray(context.wakeCommentIds)
                ? context.wakeCommentIds.filter(
                    (id): id is string => typeof id === "string",
                  )
                : wakeCommentId
                  ? [wakeCommentId]
                  : [],
        parentContextId:
          run.retryOfRunId || context.retryOfRunId
            ? null
            : (readNonEmptyString(context.originIdentityContextId) ??
              (run.triggerDetail === "manual" || context.parentRunId
                ? null
                : (issueContext?.continuationIdentityContextId ??
                  issueContext?.originIdentityContextId))),
        parentRunId:
          run.retryOfRunId ??
          readNonEmptyString(context.retryOfRunId) ??
          readNonEmptyString(context.parentRunId),
        cause:
          readNonEmptyString(context.executionIdentityCause) ??
          readNonEmptyString(context.wakeReason) ??
          "dispatch",
      });
      // Initialization has persisted the active context, including an explicit
      // absence of identity inherited from an automatic continuation.
      responsibleUserId = identityContext.responsibleUserId;
      run = {
        ...run,
        activeIdentityContextId: identityContext.id,
        responsibleUserId,
      };
      context.executionIdentityRunId = run.id;
      if (
        responsibleUserId &&
        issueContext &&
        !issueContext.responsibleUserId
      ) {
        await db
          .update(issues)
          .set({ responsibleUserId, updatedAt: new Date() })
          .where(
            and(
              eq(issues.companyId, agent.companyId),
              eq(issues.id, issueContext.id),
              isNull(issues.responsibleUserId),
            ),
          );
        issueContext = { ...issueContext, responsibleUserId };
      }
      const parsedProjectExecutionWorkspacePolicy =
        parseProjectExecutionWorkspacePolicy(
          projectContext?.executionWorkspacePolicy,
        );
      const projectExecutionWorkspacePolicy =
        applyDefaultIsolatedExecutionWorkspacePolicy({
          projectPolicy: gateProjectExecutionWorkspacePolicy(
            parsedProjectExecutionWorkspacePolicy,
            isolatedWorkspacesEnabled,
          ),
          defaultIsolatedWorkspacesEnabled,
          // Projects without workspace configuration get a plain managed
          // directory. The operator default cannot turn it into a worktree.
          hasProjectWorkspace: projectContext?.hasWorkspace ?? false,
        });
      const retainedTrust = await resolveAndRetainRunTrustPreset(db, {
        companyId: agent.companyId,
        agentId: agent.id,
        runId: run.id,
        agent: {
          companyId: agent.companyId,
          permissions: agent.permissions,
        },
        project: projectContext
          ? {
              companyId: agent.companyId,
              // Workspace feature gates must not erase authorization policy.
              executionWorkspacePolicy: projectContext.executionWorkspacePolicy,
            }
          : null,
        issue: issueContext
          ? {
              companyId: agent.companyId,
              executionPolicy: issueContext.executionPolicy,
            }
          : null,
      });
      const trustPreset = retainedTrust.trustPreset;
      if (retainedTrust.executionPolicy !== undefined) {
        // Later launch-context writes must preserve the boundary already made
        // durable for authorization and operation-time credential resolution.
        context.executionPolicy = retainedTrust.executionPolicy;
      }
      let config = parseObject(agent.adapterConfig);
      const taskSession = taskKey
        ? await getTaskSession(
            agent.companyId,
            agent.id,
            agent.adapterType,
            taskKey,
          )
        : null;
      const routerHasPersistedInput = Object.keys(parseObject(parseObject(run.runnerProfileJson).nativeExecutionInput)).length > 0;
      const persistedRouterPoolId = routerHasPersistedInput ? readNonEmptyString(parseObject(context.aiRouterSelection).poolId) : null;
      const requestedAiBinding = persistedRouterPoolId ? { mode: "router" as const, connectionId: persistedRouterPoolId } : agent.runtimeConfig?.aiConnection ? aiRuntimeConnectionBindingSchema.parse(agent.runtimeConfig.aiConnection) : undefined;
      let aiBinding = requestedAiBinding?.mode === "router" ? undefined : requestedAiBinding;
      const originalAiIssueOverrides = issueAssigneeOverrides;
      if (requestedAiBinding?.mode === "router") {
        try {
          const routerTaskKey = readNonEmptyString(context.aiRouterTaskKey) ?? taskKey ?? run.id;
          // A retry must retain the original run-key affinity even if the host
          // crashes after committing a pin but before recording its selection.
          if (routerTaskKey !== run.contextSnapshot?.aiRouterTaskKey) {
            await db.update(heartbeatRuns).set({ contextSnapshot: sql`coalesce(${heartbeatRuns.contextSnapshot}, '{}'::jsonb) || ${JSON.stringify({ aiRouterTaskKey: routerTaskKey })}::jsonb` }).where(and(eq(heartbeatRuns.id, run.id), eq(heartbeatRuns.companyId, agent.companyId)));
          }
          context.aiRouterTaskKey = routerTaskKey;
          const savedIdentity = taskSession?.sessionParamsJson?.paperclipAiCredentialIdentity;
          const selection = await aiConnectionRouterService(db, options.pluginWorkerManager).resolve({
            companyId: agent.companyId, poolId: requestedAiBinding.connectionId, agentId: agent.id,
            userId: responsibleUserId, adapterType: agent.adapterType, taskKey: String(context.aiRouterTaskKey),
            overrides: issueAssigneeOverrides?.adapterConfig ?? {},
            existingGrantId: typeof savedIdentity === "string" ? savedIdentity.split(":")[0] : undefined,
            requireExisting: Boolean(taskSession?.sessionDisplayId) && !shouldResetTaskSessionForWake(context),
            persisted: routerHasPersistedInput ? context.aiRouterSelection as AiConnectionRouterSelection | undefined : undefined,
          });
          aiBinding = selection.binding;
          // Provider-specific fields from the configured harness must not leak into the selected member.
          config = applyAiConnectionRouterTaskSettings(config, selection);
          if (issueAssigneeOverrides) issueAssigneeOverrides = { ...issueAssigneeOverrides, adapterConfig: applyAiConnectionRouterTaskSettings(issueAssigneeOverrides.adapterConfig ?? {}, selection) };
          agent = { ...agent, adapterConfig: config };
          context.aiRouterSelection = selection;
          await db.update(heartbeatRuns).set({ contextSnapshot: sql`coalesce(${heartbeatRuns.contextSnapshot}, '{}'::jsonb) || ${JSON.stringify({ aiRouterTaskKey: context.aiRouterTaskKey, aiRouterSelection: selection })}::jsonb` }).where(eq(heartbeatRuns.id, run.id));
          await appendRunEvent(run, { eventType: "lifecycle", stream: "system", level: "info", message: "Using task-pinned pool account", payload: { poolId: selection.poolId, memberId: selection.memberId, provider: aiBinding.provider, model: config.model, notes: selection.notes } });
        } catch (error) {
          if (error instanceof AiConnectionPoolExhausted && !routerHasPersistedInput) {
            const now = new Date();
            context.aiConnectionBusyDeferredWhileAssignee = issueContext?.assigneeAgentId === agent.id;
            const cancelled = await setRunStatusIfRunning(run.id, "cancelled", {
              error: error.message, errorCode: error.code, finishedAt: now,
              resultJson: {
                executionRecovery: { kind: "ai_connection_wait", providerWorkStarted: false },
                cancellation: {
                  source: "control_plane",
                  expected: true,
                  initiator: { type: "system" },
                  reason: "Waiting for an AI connection pool account",
                  recordedAt: now.toISOString(),
                },
                retryAt: error.retryAt,
              },
              contextSnapshot: context,
            });
            if (cancelled.updated) {
              await setWakeupStatus(run.wakeupRequestId, "cancelled", { finishedAt: now, error: error.message });
              const retry = await scheduleBoundedRetryForRun(cancelled.run ?? run, agent, { now, retryReason: AI_CONNECTION_POOL_WAIT_RETRY_REASON, wakeReason: "ai_connection_pool_retry", maxAttempts: (run.scheduledRetryAttempt ?? 0) + 1, delayMs: Math.max(1000, Date.parse(error.retryAt) - Date.now()) });
              if (retry.outcome !== "scheduled") await releaseIssueExecutionAndPromote(cancelled.run ?? run);
              await finalizeAgentStatus(run.agentId, "cancelled");
            }
            return;
          }
          throw new ConfigurationIncompleteFailure(error instanceof Error ? error.message : "Configure this connection pool", { configurationIncomplete: { reason: "ai_connection_unavailable", companyId: agent.companyId, agentId: agent.id, responsibleUserId, actionUrl: `/agents/${agent.id}/runtime`, fingerprint: `ai-router:${requestedAiBinding.connectionId}` } });
        }
      }
      if (isConversation(issueContext)) {
        delete context.resumeSessionParams;
        delete context.resumeSessionDisplayId;
        delete context.executionContinuation;
        delete context.paperclipContinuationSummary;
      }
      const taskSessionDecodedParams = normalizeSessionParams(
        sessionCodec.deserialize(taskSession?.sessionParamsJson ?? null),
      );
      const explicitResumeSessionParams = normalizeResumeParamsForAdapter(
        agent.adapterType,
        sessionCodec.deserialize(parseObject(context.resumeSessionParams)),
      );
      const explicitResumeSessionDisplayId = truncateDisplayId(
        readNonEmptyString(context.resumeSessionDisplayId) ??
          (sessionCodec.getDisplayId
            ? sessionCodec.getDisplayId(explicitResumeSessionParams)
            : null) ??
          readNonEmptyString(explicitResumeSessionParams?.sessionId),
      );
      const resolvedExecutionWorkspaceMode = resolveExecutionWorkspaceMode({
        projectPolicy: projectExecutionWorkspacePolicy,
        issueSettings: issueExecutionWorkspaceSettings,
        legacyUseProjectWorkspace:
          issueAssigneeOverrides?.useProjectWorkspace ?? null,
      });
      const requestedExecutionWorkspaceMode =
        trustPreset.kind === "low_trust_review" &&
        resolvedExecutionWorkspaceMode === "shared_workspace"
          ? "isolated_workspace"
          : resolvedExecutionWorkspaceMode;
      const issueRef = issueContext
        ? {
            id: issueContext.id,
            identifier: issueContext.identifier,
            title: issueContext.title,
            status: issueContext.status,
            priority: issueContext.priority,
            workMode: issueContext.workMode,
            conversationAgentId: issueContext.conversationAgentId,
            reviewPolicy: issueContext.reviewPolicy,
            description: issueContext.description,
            projectId: issueContext.projectId,
            projectWorkspaceId: issueContext.projectWorkspaceId,
            executionWorkspaceId: issueContext.executionWorkspaceId,
            executionWorkspacePreference:
              issueContext.executionWorkspacePreference,
          }
        : null;
      const storedLedgerScope = parseObject(parseObject(run.usageJson).ledgerScope);
      const runLedgerScope = Object.keys(storedLedgerScope).length > 0
        ? storedLedgerScope
        : await resolveLedgerScopeForRun(db, agent.companyId, run);
      await db.update(heartbeatRuns).set({
        usageJson: sql`coalesce(${heartbeatRuns.usageJson}, '{}'::jsonb) || ${JSON.stringify({ ledgerScope: runLedgerScope })}::jsonb`,
      }).where(eq(heartbeatRuns.id, run.id));
      const continuationSummary = issueRef && !isConversation(issueContext)
        ? await getIssueContinuationSummaryDocument(db, issueRef.id)
        : null;
      const exposeLowTrustRaw = trustPreset.kind === "low_trust_review";
      const safeContinuationSummary =
        continuationSummary && !exposeLowTrustRaw
          ? redactQuarantinedBodyForHigherTrust(continuationSummary)
          : continuationSummary;
      const safeWakeCommentContext =
        wakeCommentContext && !exposeLowTrustRaw
          ? sanitizeQuarantinedCommentForHigherTrust(wakeCommentContext)
          : wakeCommentContext;
      const issueAncestors = issueRef
        ? await issuesSvc.getAncestors(issueRef.id)
        : [];
      if (continuationSummary) {
        context.paperclipContinuationSummary = {
          key: safeContinuationSummary!.key,
          title: safeContinuationSummary!.title,
          body: safeContinuationSummary!.body,
          sourceTrust: safeContinuationSummary!.sourceTrust ?? null,
          updatedAt: safeContinuationSummary!.updatedAt.toISOString(),
        };
      } else {
        delete context.paperclipContinuationSummary;
      }
      const pinnedSkillTestContext =
        issueRef?.workMode === "skill_test"
          ? await getPinnedSkillTestContext(agent.companyId, issueRef.id)
          : null;
      if (pinnedSkillTestContext) {
        context.paperclipSkillTest = {
          ...pinnedSkillTestContext,
          directive:
            "Use this pinned file inventory as the exact skill revision under test, regardless of synced runtime skills.",
        };
      } else {
        delete context.paperclipSkillTest;
      }
      const executionContinuation =
        issueRef && !isConversation(issueContext) && issueContext?.assigneeAgentId === agent.id
          ? await buildExecutionContinuation({
              db,
              companyId: agent.companyId,
              issueId: issueRef.id,
              agentId: agent.id,
              runId: run.id,
              context,
              previousContextRunId: taskSession?.lastRunId,
              summary: safeContinuationSummary?.body ?? null,
              exposeLowTrustRaw,
            })
          : null;
      context.executionContinuation = executionContinuation;
      const paperclipWakePayload = await buildPaperclipWakePayload({
        db,
        companyId: agent.companyId,
        agentId: agent.id,
        runId: run.id,
        contextSnapshot: context,
        continuationSummary,
        issueSummary: issueRef
          ? {
              id: issueRef.id,
              identifier: issueRef.identifier,
              title: issueRef.title,
              description: issueContext?.description ?? null,
              status: issueRef.status,
              priority: issueRef.priority,
              workMode: issueRef.workMode,
              projectId: issueRef.projectId,
              executionPolicy: issueContext?.executionPolicy ?? null,
            }
          : null,
        exposeLowTrustRaw,
        simplifiedEnglishInteractions:
          experimentalInstanceSettings.enableSimplifiedEnglishInteractions ===
          true,
      });
      if (paperclipWakePayload) {
        context[PAPERCLIP_WAKE_PAYLOAD_KEY] = paperclipWakePayload;
      } else {
        delete context[PAPERCLIP_WAKE_PAYLOAD_KEY];
      }
      const safeWakeComments = (paperclipWakePayload?.comments ?? []).flatMap(
        (comment) =>
          typeof comment.id === "string" && typeof comment.body === "string"
            ? [
                {
                  id: comment.id,
                  body: fastResponseHistoryBody({ body: comment.body, origin: typeof comment.origin === "string" ? comment.origin : null }),
                  attachments: Array.isArray(comment.attachments)
                    ? comment.attachments.flatMap((attachment) => {
                        const descriptor = parseObject(attachment);
                        const id = readNonEmptyString(descriptor.id);
                        const filename = readNonEmptyString(
                          descriptor.filename,
                        );
                        const contentType = readNonEmptyString(
                          descriptor.contentType,
                        );
                        const contentPath = readNonEmptyString(
                          descriptor.contentPath,
                        );
                        const byteSize = descriptor.byteSize;
                        return id &&
                          filename &&
                          contentType &&
                          contentPath &&
                          typeof byteSize === "number"
                          ? [
                              {
                                id,
                                filename,
                                contentType,
                                byteSize,
                                contentPath,
                              },
                            ]
                          : [];
                      })
                    : [],
                },
              ]
            : [],
      );
      // Always replace caller-supplied context with the immutable, company-scoped
      // conversation snapshot. It belongs only to the endpoint's assigned agent.
      const liveVoiceGuidance = issueContext?.chatAssignedAgentId === agent.id && issueContext.chatProvider === "speko"
        ? await liveVoiceExecutionGuidance(db, { companyId: agent.companyId, issueId: issueContext.id, agentId: agent.id })
        : null;
      context.paperclipTaskCommunicationGuidance =
        issueContext?.chatAssignedAgentId === agent.id
          ? issueContext.chatCommunicationGuidance
          : null;
      const taskMarkdownInput = {
        conversationConfirmations: issueRef && isConversation(issueContext)
          ? await getConversationConfirmationContext({ db, companyId: agent.companyId, issueId: issueRef.id, agentId: agent.id })
          : null,
        issue: issueRef
          ? {
              id: issueRef.id,
              identifier: issueRef.identifier,
              title: issueRef.title,
              titleNeedsGeneration: issueContext?.titleNeedsGeneration,
              workMode: issueRef.workMode,
              conversationAgentId: issueContext?.conversationAgentId,
              description: issueRef.description,
            }
          : null,
        ancestors: issueAncestors,
        wakeComment: safeWakeCommentContext,
        wakeComments: safeWakeComments,
        attachmentOmissions: paperclipWakePayload?.attachmentOmissions,
        externalChatProvider: paperclipWakePayload?.externalChatProvider,
        slackCommand: issueContext?.chatAssignedAgentId === agent.id
          ? issueContext.chatSlackCommand
          : null,
        nativeRunner: agent.adapterType === "paperclip_runner",
        interaction: {
          kind: readNonEmptyString(context.interactionKind),
          status: readNonEmptyString(context.interactionStatus),
        },
        planReview: paperclipWakePayload?.planReviewContext?.interaction
          ? {
              status: paperclipWakePayload.planReviewContext.interaction.status,
              reason: paperclipWakePayload.planReviewContext.interaction.result?.reason,
            }
          : null,
        acceptedPlanContinuation:
          readNonEmptyString(context.workspaceRefreshReason) ===
            "accepted_plan_confirmation" &&
          Object.keys(parseObject(context.acceptedPlanWakeRouting)).length ===
            0,
        acceptedPlan: (() => {
          const accepted = parseObject(
            parseObject(context.planReviewInteraction).acceptedTargetRevision,
          );
          const revisionId = readNonEmptyString(accepted.revisionId);
          if (!revisionId) return null;
          return {
            documentId: readNonEmptyString(accepted.documentId),
            revisionId,
            revisionNumber:
              typeof accepted.revisionNumber === "number"
                ? accepted.revisionNumber
                : null,
          };
        })(),
      };
      const taskPlan = issueRef && !isConversation(issueContext)
        ? await getTaskPlanContext({
            db,
            companyId: agent.companyId,
            issueId: issueRef.id,
            approvedRevisionId: taskMarkdownInput.acceptedPlan?.revisionId,
            exposeLowTrustRaw,
          })
        : null;
      // Unlike the frozen initial communication preferences, live-call context
      // must also reach resumed turns. Rebuild it from server records each wake.
      const liveVoiceTaskPrefix = liveVoiceGuidance ? `${liveVoiceGuidance}\n\n` : "";
      let taskMarkdown = liveVoiceTaskPrefix + buildPaperclipTaskMarkdown({ ...taskMarkdownInput, taskPlan }) + chatCompletionInstruction(context);
      let taskMarkdownAssignment = liveVoiceTaskPrefix + buildPaperclipTaskMarkdown({
        ...taskMarkdownInput,
        taskPlan,
        includeWakeComments: false,
      }) + chatCompletionInstruction(context);
      const taskMarkdownCompact = liveVoiceTaskPrefix + buildPaperclipTaskMarkdown({
        ...taskMarkdownInput,
        taskPlan,
        includeDescription: false,
      }) + chatCompletionInstruction(context);
      const taskMarkdownAssignmentCompact = liveVoiceTaskPrefix + buildPaperclipTaskMarkdown({
        ...taskMarkdownInput,
        taskPlan,
        includeDescription: false,
        includeWakeComments: false,
      }) + chatCompletionInstruction(context);
      if (issueRef) {
        context.paperclipIssue = {
          id: issueRef.id,
          identifier: issueRef.identifier,
          title: issueRef.title,
          description: isConversation(issueContext) ? null : issueRef.description,
          workMode: issueRef.workMode,
        };
      } else {
        delete context.paperclipIssue;
      }
      if (wakeCommentContext) {
        context.paperclipWakeComment = safeWakeCommentContext;
      } else {
        delete context.paperclipWakeComment;
      }
      if (taskMarkdown) {
        context.paperclipTaskMarkdown = taskMarkdown;
      } else {
        delete context.paperclipTaskMarkdown;
      }
      if (taskMarkdownAssignment) {
        context.paperclipTaskMarkdownAssignment = taskMarkdownAssignment;
      } else {
        delete context.paperclipTaskMarkdownAssignment;
      }
      if (taskMarkdownCompact && taskMarkdownCompact !== taskMarkdown) {
        context.paperclipTaskMarkdownCompact = taskMarkdownCompact;
      } else {
        delete context.paperclipTaskMarkdownCompact;
      }
      if (taskMarkdownAssignmentCompact && taskMarkdownAssignmentCompact !== taskMarkdownAssignment) {
        context.paperclipTaskMarkdownAssignmentCompact = taskMarkdownAssignmentCompact;
      } else {
        delete context.paperclipTaskMarkdownAssignmentCompact;
      }
      context.paperclipTaskCommunicationGuidance = [context.paperclipTaskCommunicationGuidance, FAST_RESPONSE_AGENT_GUIDANCE].filter(Boolean).join("\n\n");
      if (issueRef) {
        const redactedWakeContext = await createRunSecretRedactionRegistry(
          db,
        ).redactForIssue(agent.companyId, issueRef.id, {
          paperclipIssue: context.paperclipIssue,
          paperclipWakeComment: context.paperclipWakeComment,
          paperclipTaskCommunicationGuidance: context.paperclipTaskCommunicationGuidance,
          paperclipTaskMarkdown: context.paperclipTaskMarkdown,
          paperclipTaskMarkdownCompact: context.paperclipTaskMarkdownCompact,
          paperclipTaskMarkdownAssignment: context.paperclipTaskMarkdownAssignment,
          paperclipTaskMarkdownAssignmentCompact: context.paperclipTaskMarkdownAssignmentCompact,
        });
        context.paperclipIssue = redactedWakeContext.paperclipIssue;
        context.paperclipTaskCommunicationGuidance = redactedWakeContext.paperclipTaskCommunicationGuidance;
        if (redactedWakeContext.paperclipWakeComment) {
          context.paperclipWakeComment =
            redactedWakeContext.paperclipWakeComment;
        }
        if (redactedWakeContext.paperclipTaskMarkdown) {
          context.paperclipTaskMarkdown =
            redactedWakeContext.paperclipTaskMarkdown;
        }
        if (redactedWakeContext.paperclipTaskMarkdownCompact) {
          context.paperclipTaskMarkdownCompact =
            redactedWakeContext.paperclipTaskMarkdownCompact;
        }
        if (redactedWakeContext.paperclipTaskMarkdownAssignment) {
          context.paperclipTaskMarkdownAssignment =
            redactedWakeContext.paperclipTaskMarkdownAssignment;
        }
        if (redactedWakeContext.paperclipTaskMarkdownAssignmentCompact) {
          context.paperclipTaskMarkdownAssignmentCompact =
            redactedWakeContext.paperclipTaskMarkdownAssignmentCompact;
        }
      }
      if (issueRef) {
        const digest = (value: string | null | undefined) =>
          value?.trim()
            ? createHash("sha256")
                .update(value.trim().replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, ""))
                .digest("hex")
            : null;
        const redactedIssue = parseObject(context.paperclipIssue);
        context.paperclipTurnContext = {
          version: 1,
          assignment: {
            owner: "task_markdown",
            description: {
              id: issueRef.id,
              revision: digest(readNonEmptyString(redactedIssue.description)),
            },
          },
          events: {
            owner: "wake_prompt",
            comments: safeWakeComments.map((comment) => ({
              id: comment.id,
              revision: digest(comment.body),
            })),
          },
        } satisfies PaperclipTurnContext;
      } else {
        delete context.paperclipTurnContext;
      }
      const {
        persistedRunnerProfile,
        persistedNativeExecutionInput,
        isDotRun,
        existingExecutionWorkspace,
        nativeRecoveryExecutionWorkspaceId,
        workspaceReuseRequest,
        requestedShouldReuseExisting,
        reusableExistingExecutionWorkspace,
        requestedReusableExecutionWorkspaceConfig,
        localEnvironment,
        resolvedInstanceSettings,
        environmentResolution,
        effectiveExecutionWorkspaceMode,
        executionPolicy,
        selectedEnvironmentId,
        selectedEnvironmentForConfig,
        nativeChatWorkspaceScope,
        nativeChatExpectedCwd,
        useIsolatedTaskDirectory,
      } = await selectHeartbeatEnvironment(db, {
        run, agent,
        task: { issueRef, issueContext, issueId, context, executionProjectId, projectContext },
        policy: {
          trustPreset, requestedExecutionWorkspaceMode, isolatedWorkspacesEnabled,
          projectExecutionWorkspacePolicy, issueExecutionWorkspaceSettings,
        },
        config: { config, issueAssigneeOverrides },
        services: { executionWorkspacesSvc, environmentsSvc, instanceSettings, findSharedWorkspaceHolder },
      });
      const workspaceManagedConfig = buildExecutionWorkspaceAdapterConfig({
        agentConfig: config,
        projectPolicy: projectExecutionWorkspacePolicy,
        issueSettings: issueExecutionWorkspaceSettings,
        mode: requestedExecutionWorkspaceMode,
        legacyUseProjectWorkspace:
          issueAssigneeOverrides?.useProjectWorkspace ?? null,
      });
      const mergedConfig = {
        ...workspaceManagedConfig,
        ...Object.fromEntries(Object.entries(issueAssigneeOverrides?.adapterConfig ?? {}).filter(([key]) => requestedAiBinding?.mode !== "router" || !["provider", "acpxAgent", "model", "modelReasoningEffort", "reasoningEffort", "effort", "variant"].includes(key))),
        ...(requestedAiBinding?.mode === "router" ? parseObject(parseObject(context.aiRouterSelection).runtimeConfig) : {}),
        // The base below is already task-owned. Keep directory transport while
        // preserving isolated mode and the mandatory sandbox preflight.
        ...(useIsolatedTaskDirectory ? { workspaceStrategy: { type: "project_primary" } } : {}),
      };
      const configSnapshot = buildExecutionWorkspaceConfigSnapshot(
        mergedConfig,
        selectedEnvironmentId,
      );
      const executionRunConfig =
        stripWorkspaceRuntimeFromExecutionRunConfig(mergedConfig);
      const runScopedMentionedSkillKeys =
        await resolveRunScopedMentionedSkillKeys({
          db,
          companyId: agent.companyId,
          issueId,
          commentIds: extractWakeCommentIds(context),
        });
      const runScopedSkillKeys =
        acceptedPlanContinuationWake &&
        !acceptedPlanWakeRoutingDecision?.suppressAcceptedContinuation
          ? [...runScopedMentionedSkillKeys, ACCEPTED_PLAN_CONVERSION_SKILL_KEY]
          : runScopedMentionedSkillKeys;
      const githubSelection = await resolveManagedGitHubIdentitySelection(
        db,
        agent.companyId,
        {
          agentId: agent.id,
          responsibleUserId,
          allowStandingDelegation: false,
        },
      );
      const useHostGitHub =
        !githubSelection.configured &&
        trustPreset.kind === "standard" &&
        ["local", "ssh"].includes(
          selectedEnvironmentForConfig?.driver ?? "local",
        );

      const { resolvedConfig, configuredTaskEnvironment, secretKeys, secretManifest } =
        await resolveExecutionRunAdapterConfig({
          managedAiCredentials: Boolean(aiBinding),
          managedGitHubCredentials: !useHostGitHub,
          companyId: agent.companyId,
          agentId: agent.id,
          adapterType: agent.adapterType,
          issueId,
          heartbeatRunId: run.id,
          environmentId: selectedEnvironmentForConfig?.id ?? null,
          environmentEnv: aiBinding ? stripAiAuthBindings(selectedEnvironmentForConfig?.envVars) : selectedEnvironmentForConfig?.envVars ?? null,
          environmentDriver: selectedEnvironmentForConfig?.driver ?? null,
          projectId: projectContext?.id ?? null,
          routineId: routineEnvContext.routineId,
          responsibleUserId,
          executionRunConfig: aiBinding ? { ...executionRunConfig, env: stripAiAuthBindings(executionRunConfig.env) } : executionRunConfig,
          projectEnv: aiBinding ? stripAiAuthBindings(projectContext?.env) : projectContext?.env ?? null,
          routineEnv: aiBinding ? stripAiAuthBindings(routineEnvContext.env) : routineEnvContext.env,
          secretsSvc,
          trustPreset,
        });
      readFailureReportSecrets = () => collectRunFailureSecretValues(resolvedConfig.env, secretKeys);
      if (aiBinding) {
        try {
          managedAiRuntime = await prepareManagedAiRuntime(db, { companyId: agent.companyId, agentId: agent.id, responsibleUserId, adapterType: agent.adapterType, binding: aiBinding, config: resolvedConfig });
        } catch (error) {
          // Only fresh executions can receive a pre-provider wait receipt. A
          // persisted native input may already have provider effects to recover.
          if (isAiConnectionBusy(error) && !persistedNativeExecutionInput) {
            // Use the authority recorded by the locked admission gate, never
            // the issue's mutable assignee observed during runtime preparation.
            const authorizedNonAssigneeWake =
              parseObject(run.runnerProfileJson).aiConnectionNonAssigneeCommentWake === true ||
              (run.scheduledRetryReason === AI_CONNECTION_BUSY_RETRY_REASON &&
                isNonAssigneeWorkspaceBusyRetry(run.scheduledRetryReason, parseObject(run.contextSnapshot)));
            await finalizeAiConnectionBusyDeferral(run, error, !authorizedNonAssigneeWake);
            return;
          }
          if (responsibleUserId && issueId) {
            await connectionIntentService(db).request({ sub: agent.id, company_id: agent.companyId, run_id: run.id, responsible_user_id: responsibleUserId }, aiBinding.provider, { purpose: "ai" }).catch(() => {
              logger.warn({ runId: run.id, agentId: agent.id }, "Could not attach AI connection request; runtime configuration action remains available");
            });
          }
          throw new ConfigurationIncompleteFailure(error instanceof Error ? error.message : "Configure this agent’s AI connection", {
            configurationIncomplete: { reason: "ai_connection_unavailable", companyId: agent.companyId, agentId: agent.id, responsibleUserId,
              ...(!persistedNativeExecutionInput && readAiConnectionConfigurationFailure(error)
                ? { selectionFailure: readAiConnectionConfigurationFailure(error) } : {}),
              ...(readAiCredentialAccessFailure(error)
                ? { credentialAccess: readAiCredentialAccessFailure(error) } : {}),
              provider: aiBinding.provider, method: aiBinding.method, actionUrl: `/agents/${agent.id}/runtime`,
              fingerprint: `ai:${agent.id}:${responsibleUserId}:${JSON.stringify(aiBinding)}` },
          });
        }
        const savedAiAccount = parseObject(run.contextSnapshot?.aiConnection);
        if (persistedNativeExecutionInput && !managedAiSessionIdentityCompatible(
          savedAiAccount.sessionIdentity ?? savedAiAccount.identity,
          managedAiRuntime.sessionIdentity,
          managedAiRuntime.identity,
        )) {
          throw new ConfigurationIncompleteFailure("The AI account changed while this native run was suspended. Start a new execution.", { configurationIncomplete: { reason: "ai_connection_changed", actionUrl: `/agents/${agent.id}/runtime` } });
        }
        Object.assign(resolvedConfig, managedAiRuntime.config);
        for (const key of AI_AUTH_ENV_KEYS) secretKeys.add(key);
        context.aiConnection = { ...managedAiRuntime.attribution, accountName: managedAiRuntime.accountName, identity: managedAiRuntime.identity, sessionIdentity: managedAiRuntime.sessionIdentity };
        await db.update(heartbeatRuns).set({ contextSnapshot: sql`coalesce(${heartbeatRuns.contextSnapshot}, '{}'::jsonb) || ${JSON.stringify({ aiConnection: context.aiConnection, ...(context.aiRouterTaskKey ? { aiRouterTaskKey: context.aiRouterTaskKey } : {}), ...(context.aiRouterSelection ? { aiRouterSelection: context.aiRouterSelection } : {}) })}::jsonb` }).where(eq(heartbeatRuns.id, run.id));
      }
      if (secretManifest.length > 0) {
        context.paperclipSecrets = {
          manifest: secretManifest,
        };
      } else {
        delete context.paperclipSecrets;
      }
      const effectiveResolvedConfig = applyRunScopedMentionedSkillKeys(
        resolvedConfig,
        runScopedSkillKeys,
      );
      const runtimeSkillPreference = readPaperclipSkillSyncPreference(
        effectiveResolvedConfig,
      );
      const nativeRunnerPreparationSpans: NativeRunHistoricalSpan[] = [];
      const skillsPrepareStartedAtMs = Date.now();
      const runtimeSkillEntries = await (async () => {
        try {
          return await companySkills.listRuntimeSkillEntries(agent.companyId, {
            versionSelections: skillVersionSelectionMap(
              runtimeSkillPreference.desiredSkillEntries,
              {
                versionPinsEnabled:
                  resolvedInstanceSettings.experimental.enableBetaSkills ===
                  true,
              },
            ),
          });
        } catch (error) {
          if (agent.adapterType === "paperclip_runner") {
            await recordFailedSkillPreparation({
              runId: run.id,
              startedAtMs: skillsPrepareStartedAtMs,
              onEvent: async (event) => {
                await appendRunEvent(run, event);
              },
            });
          }
          throw error;
        }
      })();
      nativeRunnerPreparationSpans.push({
        name: "skills.prepare",
        parentName: "task.prepare",
        startedAtMs: skillsPrepareStartedAtMs,
        endedAtMs: Date.now(),
      });
      const connectorAssignments = await resolveConnectorAssignments(db, { companyId: agent.companyId, agentId: agent.id, runId: run.id, issueId: typeof context.issueId === "string" ? context.issueId : undefined });
      const connectorSkillConfig = await applyConnectorSkills(effectiveResolvedConfig, runtimeSkillEntries, connectorAssignments);
      // Both CLI adapters and native context materialization use the same resolved set.
      runtimeSkillEntries.splice(0, runtimeSkillEntries.length, ...connectorSkillConfig.paperclipRuntimeSkills);
      const connectorDelivery = await prepareConnectorSkillDelivery(connectorSkillConfig, agent.adapterType);
      // Always replace this runtime-only field; caller wake data cannot supply skills.
      context.paperclipWake = { ...parseObject(context.paperclipWake), connectorSkillInstructions: connectorDelivery.instructions };
      let runtimeConfig = await prepareConnectionInstructionDelivery({
        resolve: () => resolveAssignedConnectionInstructionsForRun(db, { companyId: agent.companyId, agentId: agent.id, runId: run.id }),
        context, config: connectorDelivery.config, native: agent.adapterType === "paperclip_runner",
      });
      const agentIdentity = supportsManagedAgentIdentity(agent.adapterType, agent.adapterConfig, run.runtimeMode === "native" ? run.driverKind : undefined)
        ? await agentIdentityService(db).ensureAgentIdentity(agent.companyId, agent.id)
        : undefined;
      identityRedactor = createAgentIdentityRedactor(agentIdentity?.privateKeyPem);
      if (agentIdentity) secretKeys.add("PAPERCLIP_AGENT_PRIVATE_KEY");
      const resolvedFailureSecrets = readFailureReportSecrets();
      readFailureReportSecrets = () => [
        ...resolvedFailureSecrets,
        ...identityRedactor.values,
        ...collectRunFailureSecretValues(runtimeConfig.env, secretKeys),
      ];
      const latestAgentConfigRevision = await getLatestAgentConfigRevision(
        agent.companyId,
        agent.id,
      );
      const sessionConfigMetadataInput = {
          agentIdentityKeyId: agentIdentity?.keyId,
          adapterType: agent.adapterType,
          effectiveAdapterConfig: runtimeConfig,
          managedAiHome: managedAiRuntime?.home,
          agentRuntimeConfig: agent.runtimeConfig,
          issueOverrides: issueAssigneeOverrides,
          workspaceConfig: {
            requestedMode: requestedExecutionWorkspaceMode,
            effectiveMode: effectiveExecutionWorkspaceMode,
            issueConfigRevisionAt:
              issueContext?.updatedAt instanceof Date
                ? issueContext.updatedAt.toISOString()
                : (issueContext?.updatedAt ?? null),
            projectConfigRevisionAt:
              projectContext?.updatedAt instanceof Date
                ? projectContext.updatedAt.toISOString()
                : (projectContext?.updatedAt ?? null),
            projectPolicy: projectExecutionWorkspacePolicy,
            issueSettings: issueExecutionWorkspaceSettings,
            reusableExecutionWorkspaceConfig:
              requestedReusableExecutionWorkspaceConfig,
            existingExecutionWorkspace: reusableExistingExecutionWorkspace
              ? {
                  id: reusableExistingExecutionWorkspace.id,
                  mode: reusableExistingExecutionWorkspace.mode,
                  strategyType: reusableExistingExecutionWorkspace.strategyType,
                  projectWorkspaceId:
                    reusableExistingExecutionWorkspace.projectWorkspaceId,
                  repoUrl: reusableExistingExecutionWorkspace.repoUrl,
                  baseRef: reusableExistingExecutionWorkspace.baseRef,
                  branchName: reusableExistingExecutionWorkspace.branchName,
                  config: reusableExistingExecutionWorkspace.config,
                }
              : null,
          },
          environment: {
            selectionSource: environmentResolution.source,
            selectedEnvironmentId,
            selectedEnvironment: selectedEnvironmentForConfig
              ? {
                  id: selectedEnvironmentForConfig.id,
                  driver: selectedEnvironmentForConfig.driver,
                  config: selectedEnvironmentForConfig.config,
                  configRevisionAt:
                    selectedEnvironmentForConfig.updatedAt instanceof Date
                      ? selectedEnvironmentForConfig.updatedAt.toISOString()
                      : (selectedEnvironmentForConfig.updatedAt ?? null),
                }
              : null,
            executionPolicy,
          },
          environmentEnv: selectedEnvironmentForConfig?.envVars ?? null,
          projectEnv: projectContext?.env ?? null,
          routineEnv: routineEnvContext.env,
          secretManifest,
          runtimeSkills: runtimeSkillEntries,
          agentConfigRevision: latestAgentConfigRevision
            ? {
                id: latestAgentConfigRevision.id,
                changedKeys: latestAgentConfigRevision.changedKeys,
                configRevisionAt:
                  latestAgentConfigRevision.createdAt.toISOString(),
              }
            : null,
        };
      const sessionConfigMetadata = await buildEffectiveRunSessionConfigMetadata(sessionConfigMetadataInput);
      let compatibleConfigMetadata: EffectiveRunSessionConfigMetadata[] = [];
      if (managedAiRuntime && aiBinding && taskSession &&
        readConfigFingerprintFromSessionParams(taskSession.sessionParamsJson)?.fingerprint !== sessionConfigMetadata.fingerprint) {
        const revisions = requestedAiBinding?.mode === "router"
          ? await db.select().from(agentConfigRevisions).where(and(eq(agentConfigRevisions.companyId, agent.companyId), eq(agentConfigRevisions.agentId, agent.id))).orderBy(desc(agentConfigRevisions.createdAt), desc(agentConfigRevisions.id)).limit(21)
          : [];
        const candidates = aiConnectionSessionCompatibilityInputs({
          effectiveAdapterConfig: runtimeConfig, agentRuntimeConfig: agent.runtimeConfig,
          agentConfigRevision: sessionConfigMetadataInput.agentConfigRevision,
          issueOverrides: issueAssigneeOverrides, originalIssueOverrides: originalAiIssueOverrides,
          binding: aiBinding, router: requestedAiBinding?.mode === "router",
          storedIdentity: taskSession.sessionParamsJson?.paperclipAiCredentialIdentity,
          sessionIdentity: managedAiRuntime.sessionIdentity, credentialIdentity: managedAiRuntime.identity, revisions,
        });
        compatibleConfigMetadata = await Promise.all(candidates.map(candidate => buildEffectiveRunSessionConfigMetadata({ ...sessionConfigMetadataInput, ...candidate })));
      }
      const configuredModel =
        readConfiguredModelFromAdapterConfig(runtimeConfig);
      if (context.refreshTools === true && agent.adapterType !== "paperclip_runner") {
        const capability = getServerAdapter(agent.adapterType).supportsToolRefreshOnResume;
        const canRefresh = typeof capability === "function" ? capability(runtimeConfig) : capability === true;
        if (!canRefresh) context.forceFreshSession = true;
      }
      const wakeSessionResetReason = describeSessionResetReason(context);
      const sessionConfigFreshness = resolveTaskSessionConfigFreshness({
        hasTaskSession: taskSession != null,
        configuredModel,
        taskSessionParams:
          taskSession?.sessionParamsJson ?? taskSessionDecodedParams,
        configMetadata: sessionConfigMetadata,
        compatibleConfigMetadata,
        wakeResetReason: wakeSessionResetReason,
        preserveLegacySessionWithoutConfigMetadata:
          acceptedPlanContinuationWake && !acceptedPlanWakeRoutingDecision && !agentIdentity,
      });
      const resetTaskSession =
        shouldResetTaskSessionForWake(context) || sessionConfigFreshness.reset;
      const sessionResetReason =
        sessionConfigFreshness.reasons.join("; ") || null;
      const taskSessionForRun = resetTaskSession ? null : taskSession;
      const getFreshSessionHandoff = issueRef ? createNativeSessionHandoffLoader({
        db, companyId: agent.companyId, issueId: issueRef.id, agentId: agent.id, before: run.createdAt,
        throughCommentId: readNonEmptyString(context.conversationReplayThroughCommentId) ?? (context.interactionKind ? null : wakeCommentId),
      }) : undefined;
      const previousSessionParams =
        explicitResumeSessionParams ??
        (isCanonicalSessionIdForAdapter(
          agent.adapterType,
          explicitResumeSessionDisplayId,
        )
          ? { sessionId: explicitResumeSessionDisplayId }
          : null) ??
        normalizeResumeParamsForAdapter(
          agent.adapterType,
          stripPaperclipSessionMetadataFromSessionParams(
            sessionCodec.deserialize(
              taskSessionForRun?.sessionParamsJson ?? null,
            ),
          ),
        );
      // Legacy plugins can consume the existing context field on a known-fresh
      // dispatch. Built-ins also load lazily if their resume attempt fails.
      if (agent.adapterType !== "paperclip_runner" && !previousSessionParams && getFreshSessionHandoff) {
        const handoff = await getFreshSessionHandoff();
        if (handoff) context.paperclipFreshSessionHandoffMarkdown = handoff;
      }
      const {
        resolvedWorkspace,
        hostExecutionWorkspaceConfig,
        latestWorkspaceConfigMetadata,
        workspaceConfigFreshness,
        workspaceOperationRecorder,
        executionWorkspace,
        reusedExecutionWorkspace,
        resolvedWorkspaceReusePolicy,
        persistedExecutionWorkspace,
        projectRepositoryPaths,
        environmentAcquireStartedAtMs,
        selectedEnvironment,
        activeEnvironmentLease,
        realizationResult,
        environmentRealizeEndedAtMs,
        workspaceRealization,
        executionTarget,
        workspaceRestoreSource,
      } = await prepareHeartbeatWorkspace(db, {
        run, agent, controllerLease, nativeRunnerPreparationSpans,
        task: {
          issueRef,
          issueId,
          context,
          executionProjectId,
          responsibleUserId,
          previousSessionParams,
        },
        policy: {
          trustPreset,
          isolatedWorkspacesEnabled,
          effectiveExecutionWorkspaceMode,
          requestedExecutionWorkspaceMode,
          useIsolatedTaskDirectory,
          nativeChatWorkspaceScope,
          projectExecutionWorkspacePolicy,
          issueExecutionWorkspaceSettings,
          environmentExecutionWorkspaceSettings,
          executionPolicy,
        },
        environment: {
          selectedEnvironmentId,
          localEnvironment,
          selectedEnvironmentForConfig,
          environmentResolution,
          resolvedInstanceSettings,
        },
        config: {
          mergedConfig,
          configSnapshot,
          secretManifest,
        },
        reuse: {
          requestedShouldReuseExisting,
          existingExecutionWorkspace,
          reusableExistingExecutionWorkspace,
          workspaceReuseRequest,
          nativeRecoveryExecutionWorkspaceId,
          persistedNativeExecutionInput,
          isDotRun,
          runOptions,
        },
        services: {
          envOrchestrator,
          executionWorkspacesSvc,
          workspaceOperationsSvc,
          issuesSvc,
          resolveWorkspaceForRun,
          resolveReusedGitWorkspaceAnchor,
          appendRunEvent,
        },
      });
      let instructionCopy: Awaited<ReturnType<typeof instructionCopies.prepare>> = null;
      let instructionSave: Record<string, unknown> | null = null;
      const instructionPreparationKey = createHash("sha256").update(JSON.stringify({
        adapterType: agent.adapterType, adapterConfig: agent.adapterConfig, runtimeConfig: agent.runtimeConfig, sessionConfigMetadata,
        workspace: nativeSessionWorkspaceScope({
          binding: { runId: run.id, executionWorkspaceId: persistedExecutionWorkspace?.id ?? run.id },
          workspace: executionWorkspace,
        }), cwd: executionWorkspace.cwd,
      })).digest("hex");
      const recordInstructionSave = async (saved: NonNullable<Awaited<ReturnType<typeof instructionCopies.get>>>) => {
        const receipt = parseObject(saved.receipt);
        const storageWarning = readNonEmptyString(receipt.storageWarning);
        const state = saved.errorCode === "AGENT_FILES_CHECKPOINT_UNSTABLE" ? "pending_collection"
          : saved.state === "warm_saved" ? readNonEmptyString(receipt.checkpointState) ?? "saved" : saved.state;
        instructionSave = { state, entryFile: saved.entryFile,
          ...(isAgentDirectoryCopy(saved) ? { contract: "agent_files", appliedCandidateHash: saved.candidateHash, checkpointStats: receipt.checkpointStats }
            : { revisionId: parseObject(receipt.revision).id ?? null }), storageWarning, errorCode: saved.errorCode, errorMessage: saved.errorMessage };
        await appendRunEvent(run, { eventType: "instruction_save", stream: "system",
          level: !saved.errorCode && !storageWarning && ["saved", "unchanged", "resolved"].includes(state) ? "info" : "warn",
          message: storageWarning ?? (state === "saved" ? "Agent files saved."
            : state === "unchanged" ? "Instruction working copy is unchanged."
              : saved.errorMessage ?? "Instruction edits were not saved."), payload: instructionSave });
      };
      const collectStoppedInstructions = async () => {
        if (!instructionCopy) return;
        const saved = await collectStoppedInstructionCopyWithRetries(() => instructionCopies.collectStopped({
          companyId: agent.companyId, runId: run.id, target: executionTarget,
        }));
        if (!saved) return;
        if (saved.state !== "superseded") await recordInstructionSave(saved);
      };
      const nativeInstructionWorkingCopy = () => instructionCopy ? {
        ...(isAgentDirectoryCopy(instructionCopy) ? { runId: run.id, preparationKey: instructionPreparationKey } : {}),
        root: instructionCopy.executionRoot,
        ...(instructionCopy.receipt?.warm === true ? { checkpointWarm: async () => {
          const saved = await instructionCopies.checkpointWarm({ companyId: agent.companyId, runId: run.id, target: executionTarget });
          if (saved) await recordInstructionSave(saved);
          return saved?.state === "warm_saved" && saved.errorCode === null;
        } } : {}),
        hasChanges: () => instructionCopies.hasChanges({ companyId: agent.companyId, runId: run.id, target: executionTarget }),
        collectStopped: collectStoppedInstructions,
        retirementFailed: async () => { await instructionCopies.reportRetirementUnconfirmed(agent.companyId, run.id); },
      } : undefined;
      if (managedAiRuntime && aiBinding) {
        try { await assertManagedAiProjectAuth({ ...resolvedConfig, cwd: executionWorkspace.cwd }, aiBinding.provider, executionTarget); }
        catch { throw new ConfigurationIncompleteFailure("Project authentication conflicts with this agent’s managed AI connection", { configurationIncomplete: { reason: "ai_connection_incompatible", actionUrl: `/agents/${agent.id}/runtime` } }); }
      }
      const remoteExecution = realizationResult.remoteExecution;
      if (
        nativeChatWorkspaceScope &&
        (executionTarget?.kind === "remote" ||
          path.resolve(executionWorkspace.cwd) !== nativeChatExpectedCwd)
      ) {
        throw new ConfigurationIncompleteFailure(
          "External chat workspace realization did not preserve this task's isolated filesystem. Repair its workspace before retrying.",
          {
            configurationIncomplete: {
              reason: "native_chat_workspace_realization_mismatch",
              issueId,
            },
          },
        );
      }
      const dispatchResolvedInteractionContinuationAfterAdmission = async <T>(
        dispatch: (markDispatchStarted: () => void) => Promise<T>,
      ): Promise<
        { dispatched: true; resultPromise: Promise<T> } | { dispatched: false }
      > => {
        await controllerLease.assertOwned("dispatching");
        // Recheck after workspace/credential preparation, immediately before the
        // provider handoff. Never hold validation locks while adapter code runs.
        await authorizeFailedChatRetryExecution();
        if (
          !(await withChatControlRecoveryGate(
            run,
            "dispatch",
            async () => run,
            Boolean(
              runOptions.nativeLeaseOwner || runOptions.nativeRestartRecovery,
            ),
          ))
        )
          return { dispatched: false };
        const repairBlock = await recovery.legacyRepairDispatchBlock(run.id);
        if (repairBlock) {
          const cancelled = await setRunStatusIfRunning(run.id, "cancelled", {
            finishedAt: new Date(), errorCode: "legacy_disposition_repair_suppressed",
            error: `Disposition repair suppressed: ${repairBlock}`,
          });
          if (cancelled.updated) {
            await setWakeupStatus(run.wakeupRequestId, "skipped", { finishedAt: new Date(), error: repairBlock });
            await releaseIssueExecutionAndPromote(cancelled.run!, { suppressImmediateRecovery: true });
            await finalizeAgentStatus(run.agentId, "cancelled");
          }
          return { dispatched: false };
        }
        if (
          !issueId ||
          (!isResolvedInteractionContinuationWakeContext(context) &&
            !["native_safe_replacement", "native_provider_overloaded"].includes(run.scheduledRetryReason ?? ""))
        ) {
          return { dispatched: true, resultPromise: dispatch(() => {}) };
        }
        await options.beforeResolvedInteractionContinuationDispatchCheck?.({
          runId: run.id,
          issueId,
        });

        await options.afterResolvedInteractionContinuationDispatchCheck?.({
          runId: run.id,
          issueId,
        });
        const gate = await runDispatch.dispatchResolvedInteractionIfCurrent({
          runId: run.id,
          companyId: run.companyId,
          expectedStatus: "running",
          // Synchronous handoff under the ownership lock; the gate commits
          // without awaiting the adapter's asynchronous bootstrap or finalizer.
          dispatch,
        });

        if (gate.dispatched) return gate;
        if (gate.cancellation.outcome === "cancelled") {
          applyRunDispatchPostCommitEffects(
            gate.cancellation.postCommitEffects,
          );
        }
        return { dispatched: false };
      };
      const dispatchResolvedInteractionContinuationWithAtomicGate = async <T>(
        dispatch: (markDispatchStarted: () => void) => Promise<T>,
      ) => {
        // Admission can wait for accounting locks. Finish that wait before the
        // final ownership gate, whose callback must enter the adapter directly.
        const reservation = await reserveRunBudget(db, run.companyId, run.id,
          readNonEmptyString(runLedgerScope.projectId), runLedgerScope, runOptions.nativeLeaseOwner);
        let entered = false;
        try {
          return await dispatchResolvedInteractionContinuationAfterAdmission((markDispatchStarted) => {
            entered = true;
            return dispatch(markDispatchStarted);
          });
        } finally {
          if (!entered && !reservation.reused) {
            await db.update(heartbeatRuns).set({ costAccountingPending: true,
              usageJson: sql`coalesce(${heartbeatRuns.usageJson}, '{}'::jsonb) || '{"accountingProviderWorkStarted":false}'::jsonb`,
            }).where(and(eq(heartbeatRuns.id, run.id), isNull(heartbeatRuns.costAccountedAt)));
            await accountRunCost(db, run.id, budgetHooks).catch((err) => {
              logger.warn({ err, runId: run.id }, "Undispatched reservation release remains pending");
            });
          }
        }
      };
      if (!executionTarget || executionTarget.kind === "local") {
        try {
          runScratch = await prepareHeartbeatRunScratch({
            companyId: agent.companyId,
            agentId: agent.id,
            runId: run.id,
            issueId: issueRef?.id ?? null,
            issueIdentifier: issueRef?.identifier ?? null,
          });
          const existingRuntimeEnv = parseObject(runtimeConfig.env);
          const scratchEnv = buildHeartbeatRunScratchEnv(
            existingRuntimeEnv,
            runScratch,
          );
          runtimeConfig = {
            ...runtimeConfig,
            env: {
              ...existingRuntimeEnv,
              ...scratchEnv.env,
            },
          };
          context.paperclipScratch = {
            type: "heartbeat_run",
            dir: runScratch.dir,
            cleanupPolicy: "terminal_run",
            marker: HEARTBEAT_RUN_SCRATCH_MARKER,
            tempKeysApplied: scratchEnv.tempKeysApplied,
          };
        } catch (scratchPrepareError) {
          runScratch = null;
          delete context.paperclipScratch;
          logger.warn(
            {
              err: scratchPrepareError,
              runId: run.id,
              issueId,
              agentId: agent.id,
            },
            "failed to prepare heartbeat run scratch directory; continuing without scratch env",
          );
        }
      } else {
        delete context.paperclipScratch;
      }
      const gitExecutionEnv = await prepareGitHubExecutionEnvironment({
        target: executionTarget,
        cwd: executionWorkspace.cwd,
        env: Object.fromEntries(
          Object.entries(parseObject(runtimeConfig.env)).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        ),
        hostCredentials: useHostGitHub,
        // Networking is a controller-owned trust decision, independent of
        // whether GitHub is configured or a credential can be acquired.
        networkAccess:
          trustPreset.kind === "standard" &&
          process.env.PAPERCLIP_RUNNER_NETWORK_ACCESS !== "disabled",
      });
      runtimeConfig = { ...runtimeConfig, env: gitExecutionEnv };
      for (const key of MANAGED_GITHUB_TOKEN_KEYS) secretKeys.add(key);
      context.githubAuthenticationMode = useHostGitHub ? "host" : "managed";
      if (!useHostGitHub) {
        const githubLaunchers = await prepareHeartbeatGitHubLaunchers({
          native: agent.adapterType === "paperclip_runner",
          githubConfigured: githubSelection.configured,
          agentId: agent.id,
          runId: run.id,
          target: executionTarget,
          cwd: executionWorkspace.cwd,
          env: gitExecutionEnv,
          brokerUrl: configuredPaperclipApiBaseUrl() ?? "",
          createBrokerToken: () => createRuntimeToolsToken({
            agentId: agent.id,
            companyId: agent.companyId,
            runId: run.id,
            responsibleUserId: responsibleUserId ?? "",
            scope: "github_credentials",
          })?.token ?? "",
        });
        githubLauncherLocation = githubLaunchers.cleanupLocation;
        runtimeConfig = { ...runtimeConfig, env: githubLaunchers.env };
        secretKeys.add("PAPERCLIP_GITHUB_BROKER_TOKEN");
      }
      context.paperclipEnvironment = {
        id: selectedEnvironment.id,
        name: selectedEnvironment.name,
        driver: selectedEnvironment.driver,
        leaseId: activeEnvironmentLease.lease.id,
        workspaceRealization,
        sandboxLeaseAcquisition:
          activeEnvironmentLease.lease.metadata?.sandboxLeaseAcquisition ??
          null,
        ...(typeof activeEnvironmentLease.lease.metadata?.remoteCwd === "string"
          ? {
              remoteCwd: activeEnvironmentLease.lease.metadata.remoteCwd,
              host:
                typeof activeEnvironmentLease.lease.metadata?.host === "string"
                  ? activeEnvironmentLease.lease.metadata.host
                  : undefined,
              port:
                typeof activeEnvironmentLease.lease.metadata?.port === "number"
                  ? activeEnvironmentLease.lease.metadata.port
                  : undefined,
              username:
                typeof activeEnvironmentLease.lease.metadata?.username ===
                "string"
                  ? activeEnvironmentLease.lease.metadata.username
                  : undefined,
            }
          : {}),
      };
      await db
        .update(heartbeatRuns)
        .set({
          contextSnapshot: context,
          updatedAt: new Date(),
        })
        .where(eq(heartbeatRuns.id, run.id));
      const runtimeSessionResolution = resolveRuntimeSessionParamsForWorkspace({
        agentId: agent.id,
        previousSessionParams,
        resolvedWorkspace: {
          ...resolvedWorkspace,
          cwd: executionWorkspace.cwd,
        },
      });
      const runtimeSessionParams = runtimeSessionResolution.sessionParams;
      const runtimeWorkspaceWarnings = [
        ...resolvedWorkspace.warnings,
        ...executionWorkspace.warnings,
        ...(runtimeSessionResolution.warning
          ? [runtimeSessionResolution.warning]
          : []),
        ...(requestedShouldReuseExisting &&
        workspaceConfigFreshness.reasons.length > 0
          ? [
              `Execution workspace reuse freshness action "${workspaceConfigFreshness.action}" because ${workspaceConfigFreshness.reasons.join("; ")}.`,
            ]
          : []),
        ...(resetTaskSession && sessionResetReason
          ? [
              taskKey
                ? `Skipping saved session resume for task "${taskKey}" because ${sessionResetReason}.`
                : `Skipping saved session resume because ${sessionResetReason}.`,
            ]
          : []),
      ];
      context.paperclipWorkspace = {
        cwd: executionWorkspace.cwd,
        source: executionWorkspace.source,
        mode: effectiveExecutionWorkspaceMode,
        strategy: executionWorkspace.strategy,
        projectId: executionWorkspace.projectId,
        workspaceId: executionWorkspace.workspaceId,
        repoUrl: executionWorkspace.repoUrl,
        repoRef: executionWorkspace.repoRef,
        branchName: executionWorkspace.branchName,
        worktreePath: executionWorkspace.worktreePath,
        realization: workspaceRealization,
        agentHome: await (async () => {
          const home = resolveDefaultAgentWorkspaceDir(agent.id);
          await fs.mkdir(home, { recursive: true });
          return home;
        })(),
      };
      context.paperclipWorkspaces = buildRunWorkspaceHints(resolvedWorkspace);
      // Emit exactly one requested-vs-synced observability line for the referenced-project set. A run
      // with no referenced project stays silent, so this adds no noise to the anchor-only default. The
      // per-drop human warning already rides `runtimeWorkspaceWarnings`; this line carries the counts
      // and the per-failure reason for a partial sync.
      const referencedProjectObservability =
        buildReferencedProjectRunObservability({
          syncedProjectIds: resolvedWorkspace.additionalWorkspaces.map(
            (additional) => additional.projectId,
          ),
          failures: resolvedWorkspace.referencedProjectFailures,
        });
      if (referencedProjectObservability.referenced_projects_requested > 0) {
        logger.info(
          {
            runId: run.id,
            companyId: agent.companyId,
            issueId: issueRef?.id ?? null,
            ...referencedProjectObservability,
          },
          "run referenced-project sync",
        );
      }
      // The wake payload is built before the execution workspace is resolved, so
      // attach the branch pin here; the shared wake-prompt renderer surfaces it as
      // a one-time "stay on this branch" hint on non-resumed sessions.
      if (executionWorkspace.branchName) {
        const wakePayloadForWorkspace = parseObject(
          context[PAPERCLIP_WAKE_PAYLOAD_KEY],
        );
        context[PAPERCLIP_WAKE_PAYLOAD_KEY] = {
          ...wakePayloadForWorkspace,
          executionWorkspace: { branchName: executionWorkspace.branchName },
        };
      }
      const runtimeServiceIntents = (() => {
        const runtimeConfig = parseObject(
          hostExecutionWorkspaceConfig.workspaceRuntime,
        );
        return Array.isArray(runtimeConfig.services)
          ? runtimeConfig.services.filter(
              (value): value is Record<string, unknown> =>
                typeof value === "object" && value !== null,
            )
          : [];
      })();
      assertLowTrustRuntimeServicesAllowed({
        resolution: trustPreset,
        runtimeServiceCount: runtimeServiceIntents.length,
      });
      if (runtimeServiceIntents.length > 0) {
        context.paperclipRuntimeServiceIntents = runtimeServiceIntents;
      } else {
        delete context.paperclipRuntimeServiceIntents;
      }
      if (
        executionWorkspace.projectId &&
        !readNonEmptyString(context.projectId)
      ) {
        context.projectId = executionWorkspace.projectId;
      }
      const runtimeSessionFallback =
        taskKey || resetTaskSession
          ? null
          : isCanonicalSessionIdForAdapter(agent.adapterType, runtime.sessionId)
            ? runtime.sessionId
            : null;
      const runtimeSessionDisplayId = truncateDisplayId(
        explicitResumeSessionDisplayId ??
          taskSessionForRun?.sessionDisplayId ??
          (sessionCodec.getDisplayId
            ? sessionCodec.getDisplayId(runtimeSessionParams)
            : null) ??
          readNonEmptyString(runtimeSessionParams?.sessionId) ??
          runtimeSessionFallback,
      );
      let previousSessionDisplayId = requiresCanonicalSessionIds(
        agent.adapterType,
      )
        ? truncateDisplayId(
            readNonEmptyString(previousSessionParams?.sessionId) ??
              (isCanonicalSessionIdForAdapter(
                agent.adapterType,
                runtimeSessionDisplayId,
              )
                ? runtimeSessionDisplayId
                : null) ??
              runtimeSessionFallback,
          )
        : runtimeSessionDisplayId;
      let runtimeSessionIdForAdapter =
        readNonEmptyString(runtimeSessionParams?.sessionId) ??
        runtimeSessionFallback;
      let runtimeSessionParamsForAdapter = normalizeSessionParams(
        stripPaperclipSessionMetadataFromSessionParams(runtimeSessionParams),
      );

      const sessionCompaction = await evaluateSessionCompaction({
        agent,
        sessionId: previousSessionDisplayId ?? runtimeSessionIdForAdapter,
        issueId,
        continuationSummaryBody: continuationSummary?.body ?? null,
      });
      if (sessionCompaction.rotate) {
        context.paperclipSessionHandoffMarkdown =
          sessionCompaction.handoffMarkdown;
        context.paperclipSessionRotationReason = sessionCompaction.reason;
        context.paperclipPreviousSessionId =
          previousSessionDisplayId ?? runtimeSessionIdForAdapter;
        runtimeSessionIdForAdapter = null;
        runtimeSessionParamsForAdapter = null;
        previousSessionDisplayId = null;
        if (sessionCompaction.reason) {
          runtimeWorkspaceWarnings.push(
            `Starting a fresh session because ${sessionCompaction.reason}.`,
          );
        }
      } else {
        delete context.paperclipSessionHandoffMarkdown;
        delete context.paperclipSessionRotationReason;
        delete context.paperclipPreviousSessionId;
      }

      const taskSessionCredentialCompatible = !managedAiRuntime || managedAiSessionIdentityCompatible(
        taskSession?.sessionParamsJson?.paperclipAiCredentialIdentity,
        managedAiRuntime.sessionIdentity,
        managedAiRuntime.identity,
      );
      if (managedAiRuntime) {
        sessionConfigMetadata.aiCredentialIdentity = managedAiRuntime.sessionIdentity;
        if (!taskSessionCredentialCompatible) {
          runtimeSessionIdForAdapter = null;
          runtimeSessionParamsForAdapter = null;
          previousSessionDisplayId = null;
          delete executionContinuation?.resumeDelta;
        }
      }
      const runtimeForAdapter = {
        sessionId: runtimeSessionIdForAdapter,
        sessionParams: runtimeSessionParamsForAdapter,
        sessionDisplayId: previousSessionDisplayId,
        taskKey,
      };
      // A delta is safe only when the selected provider session is exactly the
      // task session whose last dispatch supplied the baseline history.
      if (
        executionContinuation?.resumeDelta &&
        (!taskSessionForRun ||
          !taskSession?.sessionDisplayId ||
          runtimeForAdapter.sessionDisplayId !== taskSession.sessionDisplayId ||
          resetTaskSession ||
          context.forceFreshSession === true)
      ) {
        delete executionContinuation.resumeDelta;
      }
      const configFreshnessResultMetadata = {
        version: sessionConfigMetadata.version,
        session: {
          fingerprintVersion: sessionConfigMetadata.version,
          categories: sessionConfigMetadata.categories,
          reset: resetTaskSession,
          resetReasons: sessionConfigFreshness.reasons,
          changedCategories: sessionConfigFreshness.changedCategories,
          taskSessionAvailable: taskSession != null,
          taskSessionReused: taskSessionForRun != null,
          storedFingerprintPresent: Boolean(
            sessionConfigFreshness.storedFingerprint,
          ),
          nextFingerprint: sessionConfigFreshness.nextFingerprint,
        },
        workspace: {
          fingerprintVersion: latestWorkspaceConfigMetadata.version,
          categories: latestWorkspaceConfigMetadata.categories,
          action: workspaceConfigFreshness.action,
          changedCategories: workspaceConfigFreshness.changedCategories,
          reasons: workspaceConfigFreshness.reasons,
          reuseRequested: requestedShouldReuseExisting,
          workspaceReused: Boolean(reusedExecutionWorkspace),
          configSnapshotRefreshed:
            resolvedWorkspaceReusePolicy.shouldRefreshWorkspaceConfigSnapshot,
          storedFingerprintPresent:
            workspaceConfigFreshness.storedFingerprintPresent,
          storedFingerprint: workspaceConfigFreshness.storedFingerprint,
          inferredFingerprint: workspaceConfigFreshness.inferredFingerprint,
          nextFingerprint: workspaceConfigFreshness.nextFingerprint,
          previousWorkspaceId:
            workspaceReuseRequest.requestedExecutionWorkspaceId,
          activeWorkspaceId: persistedExecutionWorkspace?.id ?? null,
        },
      };

      let handle: RunLogHandle | null = null;
      const goalCheckpointSession: {
        current: {
          params: Record<string, unknown>;
          displayId: string;
        } | null;
      } = { current: null };
      let stdoutExcerpt = "";
      let stderrExcerpt = "";
      let outputSeq = Number(run.lastOutputSeq ?? 0);
      let lastOutputFlushAt: Date | null = run.lastOutputAt ?? null;
      let lastLogRuntimeStatusTouchMs = 0;
      const outputProgressState: {
        pending: {
          at: Date;
          seq: number;
          stream: "stdout" | "stderr";
          bytes: number;
        } | null;
      } = { pending: null };
      let persistedLogBytes = Number(run.logBytes ?? 0);
      const flushOutputProgress = async (opts?: { force?: boolean }) => {
        const pendingOutputProgress = outputProgressState.pending;
        if (!pendingOutputProgress) return;
        const shouldFlush =
          opts?.force === true ||
          !lastOutputFlushAt ||
          pendingOutputProgress.at.getTime() - lastOutputFlushAt.getTime() >=
            ACTIVE_RUN_OUTPUT_PROGRESS_FLUSH_INTERVAL_MS;
        if (!shouldFlush) return;
        await db
          .update(heartbeatRuns)
          .set({
            lastOutputAt: pendingOutputProgress.at,
            lastOutputSeq: pendingOutputProgress.seq,
            lastOutputStream: pendingOutputProgress.stream,
            lastOutputBytes: pendingOutputProgress.bytes,
            updatedAt: new Date(),
          })
          .where(eq(heartbeatRuns.id, run.id));
        lastOutputFlushAt = pendingOutputProgress.at;
        outputProgressState.pending = null;
      };
      try {
        const startedAt = run.startedAt ?? new Date();
        const runningWithSession = await db
          .update(heartbeatRuns)
          .set({
            startedAt,
            sessionIdBefore:
              runtimeForAdapter.sessionDisplayId ?? runtimeForAdapter.sessionId,
            contextSnapshot: context,
            updatedAt: new Date(),
          })
          .where(eq(heartbeatRuns.id, run.id))
          .returning()
          .then((rows) => rows[0] ?? null);
        if (runningWithSession) run = runningWithSession;

        // Pause Durability: flip to "running" ONLY if the agent is still invokable.
        // Atomic conditional UPDATE is the sole gate (no read-then-write); 0 rows => abort.
        const runningAgent = await db
          .update(agents)
          .set({ status: "running", updatedAt: new Date() })
          .where(
            and(
              eq(agents.id, agent.id),
              notInArray(agents.status, [...DIRECT_NON_INVOKABLE_STATUSES]),
              eq(agents.lifecycleState, "ready"),
            ),
          )
          .returning()
          .then((rows) => rows[0] ?? null);

        if (!runningAgent) {
          logger.warn(
            { agentId: agent.id, runId: run.id, previousStatus: agent.status },
            "execution-start aborted: agent not invokable",
          );
          const abortReason =
            "Cancelled: agent not invokable at execution-start";
          await setRunStatus(run.id, "cancelled", {
            finishedAt: new Date(),
            error: abortReason,
            errorCode: "agent_not_invokable",
            ...(agent
              ? {
                  resultJson: mergeRunStopMetadataForAgent(agent, "cancelled", {
                    resultJson: parseObject(run.resultJson),
                    errorCode: "agent_not_invokable",
                    errorMessage: abortReason,
                  }),
                }
              : {}),
          });
          await setWakeupStatus(run.wakeupRequestId, "cancelled", {
            finishedAt: new Date(),
            error: abortReason,
          });
          await releaseIssueExecutionAndPromote(run);
          return;
        }

        publishLiveEvent({
          companyId: runningAgent.companyId,
          type: "agent.status",
          payload: {
            agentId: runningAgent.id,
            status: runningAgent.status,
            outcome: "running",
          },
        });

        const currentRun = run;
        await appendRunEvent(currentRun, {
          eventType: "lifecycle",
          stream: "system",
          level: "info",
          message: "run started",
        });

        handle = await runLogStore.begin({
          companyId: run.companyId,
          agentId: run.agentId,
          runId,
        });

        await db
          .update(heartbeatRuns)
          .set({
            logStore: handle.store,
            logRef: handle.logRef,
            updatedAt: new Date(),
          })
          .where(eq(heartbeatRuns.id, runId));

        const currentUserRedactionOptions =
          await getCurrentUserRedactionOptions();
        const appendIdentityRedactedLog = async (stream: "stdout" | "stderr", chunk: string) => {
          const sanitizedChunk = compactRunLogChunk(
            redactCurrentUserText(chunk, currentUserRedactionOptions),
          );
          if (stream === "stdout")
            stdoutExcerpt = appendExcerpt(stdoutExcerpt, sanitizedChunk);
          if (stream === "stderr")
            stderrExcerpt = appendExcerpt(stderrExcerpt, sanitizedChunk);
          const ts = new Date().toISOString();

          outputSeq += 1;
          const chunkSeq = outputSeq;
          let appendedBytes = 0;
          if (handle) {
            appendedBytes = await runLogStore.append(handle, {
              stream,
              chunk: sanitizedChunk,
              ts,
              seq: chunkSeq,
            });
            persistedLogBytes += appendedBytes;
          }
          outputProgressState.pending = {
            at: new Date(ts),
            seq: chunkSeq,
            stream,
            bytes: persistedLogBytes,
          };
          await flushOutputProgress();

          // Streamed CLI output is real run activity: keep the in-memory
          // runtime status ("Working... / X ago") fresh between structured
          // events so sandbox runs with mid-run log streaming never show a
          // minutes-stale timestamp. Throttled to avoid churning the live
          // event stream on every 250ms tail chunk.
          const logActivityAt = new Date(ts);
          if (
            isHeartbeatRunRuntimeStatusActive(run.status) &&
            logActivityAt.getTime() - lastLogRuntimeStatusTouchMs >=
              ACTIVE_RUN_LOG_RUNTIME_STATUS_REFRESH_INTERVAL_MS
          ) {
            lastLogRuntimeStatusTouchMs = logActivityAt.getTime();
            const touchedStatus = touchHeartbeatRunRuntimeStatus({
              companyId: run.companyId,
              issueId,
              agentId: run.agentId,
              runId: run.id,
              at: logActivityAt,
            });
            if (touchedStatus)
              publishHeartbeatRunRuntimeProgress(touchedStatus);
          }

          const payloadChunk =
            sanitizedChunk.length > MAX_LIVE_LOG_CHUNK_BYTES
              ? sanitizedChunk.slice(
                  sanitizedChunk.length - MAX_LIVE_LOG_CHUNK_BYTES,
                )
              : sanitizedChunk;

          publishLiveEvent({
            companyId: run.companyId,
            type: "heartbeat.run.log",
            payload: {
              runId: run.id,
              agentId: run.agentId,
              issueId,
              ts,
              seq: chunkSeq,
              stream,
              chunk: payloadChunk,
              truncated: payloadChunk.length !== sanitizedChunk.length,
            },
          });
        };
        const onLog = (stream: "stdout" | "stderr", chunk: string) =>
          appendIdentityRedactedLog(stream, identityRedactor.chunk(stream, chunk));
        if (runScopedMentionedSkillKeys.length > 0) {
          await onLog(
            "stdout",
            `[paperclip] Enabled run-scoped skills from issue mentions: ${runScopedMentionedSkillKeys.join(", ")}\n`,
          );
        }
        for (const warning of runtimeWorkspaceWarnings) {
          const logEntry = formatRuntimeWorkspaceWarningLog(warning);
          await onLog(logEntry.stream, logEntry.chunk);
        }
        await assertGitSensitiveAdapterWorkspaceValid({
          adapterType: agent.adapterType,
          agentId: agent.id,
          issue: issueRef
            ? {
                id: issueRef.id,
                identifier: issueRef.identifier,
                projectId: issueRef.projectId,
                projectWorkspaceId: issueRef.projectWorkspaceId,
              }
            : null,
          resolvedWorkspace,
          executionWorkspace,
          persistedExecutionWorkspace,
          executionTarget,
          environmentDriver: selectedEnvironment.driver,
          leaseMetadata: activeEnvironmentLease.lease.metadata,
        });
        const adapterEnv = Object.fromEntries(
          Object.entries(parseObject(runtimeConfig.env)).filter(
            (entry): entry is [string, string] =>
              typeof entry[0] === "string" && typeof entry[1] === "string",
          ),
        );
        const runtimeServices = await ensureRuntimeServicesForRun({
          db,
          runId: run.id,
          agent: {
            id: agent.id,
            name: agent.name,
            companyId: agent.companyId,
          },
          issue: issueRef,
          workspace: executionWorkspace,
          executionWorkspaceId:
            persistedExecutionWorkspace?.id ??
            issueRef?.executionWorkspaceId ??
            null,
          config: hostExecutionWorkspaceConfig,
          adapterEnv,
          onLog,
          recorder: workspaceOperationRecorder,
        });
        if (runtimeServices.length > 0) {
          context.paperclipRuntimeServices = runtimeServices;
          context.paperclipRuntimePrimaryUrl =
            runtimeServices.find((service) => readNonEmptyString(service.url))
              ?.url ?? null;
          await db
            .update(heartbeatRuns)
            .set({
              contextSnapshot: context,
              updatedAt: new Date(),
            })
            .where(eq(heartbeatRuns.id, run.id));
        }
        if (
          issueId &&
          (executionWorkspace.created ||
            runtimeServices.some((service) => !service.reused))
        ) {
          try {
            await postWorkspaceReadyComment({
              issuesSvc,
              issueId,
              agentId: agent.id,
              runId: run.id,
              workspace: executionWorkspace,
              runtimeServices,
            });
          } catch (err) {
            await onLog(
              "stderr",
              `[paperclip] Failed to post workspace-ready comment: ${err instanceof Error ? err.message : String(err)}\n`,
            );
          }
        }
        const onAdapterMeta = async (meta: AdapterInvocationMeta) => {
          meta = identityRedactor.redact(meta);
          if (meta.env && secretKeys.size > 0) {
            for (const key of secretKeys) {
              if (key in meta.env) meta.env[key] = "***REDACTED***";
            }
          }
          await appendRunEvent(currentRun, {
            eventType: "adapter.invoke",
            stream: "system",
            level: "info",
            message: "adapter invocation",
            payload: meta as unknown as Record<string, unknown>,
          });
        };

        const onAdapterEvent = async (event: AdapterRuntimeEvent) => {
          event = identityRedactor.redact(event);
          const eventType = event.eventType.trim();
          if (!eventType) return;
          await appendRunEvent(currentRun, {
            eventType: eventType.slice(0, 120),
            stream: event.stream,
            level: event.level,
            color: event.color,
            message: event.message,
            payload: event.payload,
          });
        };

        const adapter = getServerAdapter(agent.adapterType);
        const durableGoalControlRun =
          readNonEmptyString(context.goalControlRequestId) !== null ||
          context.resumeSessionGoalHeartbeat === true;
        // Goals must use the selected durable runner, never silently convert a
        // direct adapter or let an old goal-control wake become a normal prompt.
        if (durableGoalControlRun && agent.adapterType !== "paperclip_runner") {
          const requestId = readNonEmptyString(context.goalControlRequestId);
          if (issueRef && requestId) {
            await failRunnerGoalAction(
              db,
              {
                companyId: run.companyId,
                issueId: issueRef.id,
                agentId: agent.id,
                adapterType: agent.adapterType,
              },
              requestId,
              "direct_adapter_goal_controller_unavailable",
            );
          }
          throw new Error("direct_adapter_goal_controller_unavailable");
        }
        // Runtime selection is immutable once persisted. In particular, turning the instance flag
        // off prevents new native runs without changing the recovery path for an already-native run.
        const nativeRuntimeResolution = resolveHeartbeatNativeRuntimeMode({
          persisted: run,
          enabled:
            resolvedInstanceSettings.experimental.enableNativeRunner === true,
          dotEnabled: resolvedInstanceSettings.experimental.enableOpenAiDot === true
            && resolvedInstanceSettings.experimental.enablePublicMcp === true,
          runtimeConfig: agent.runtimeConfig,
          adapterConfig: agent.adapterConfig,
          agent: {
            id: agent.id,
            status: runningAgent.status,
            adapterType: agent.adapterType,
          },
          issue: issueRef,
          target: executionTarget,
          workspaceId: persistedExecutionWorkspace?.id ?? null,
        });
        const hasInstructionFilesystem = nativeRuntimeResolution.kind !== "native"
          ? adapter.supportsInstructionsBundle === true
          : !["claude_managed_agents_api", "aws_agentcore_harness_api", "openai_dot_mcp"].includes(nativeRuntimeResolution.profile.backend);
        if (hasInstructionFilesystem) {
          try {
            // Missing contract fields on a restored session mean the deployed
            // legacy format. New sessions opt into whole-directory persistence.
            const priorFileRun = taskSession?.lastRunId
              ? await db.select({ profile: heartbeatRuns.runnerProfileJson }).from(heartbeatRuns).where(and(
                  eq(heartbeatRuns.id, taskSession.lastRunId), eq(heartbeatRuns.companyId, agent.companyId), eq(heartbeatRuns.agentId, agent.id))).then(rows => rows[0])
              : null;
            const savedFileInput = parseObject(parseObject(run.runnerProfileJson).nativeExecutionInput);
            const priorFileInput = Object.keys(savedFileInput).length ? savedFileInput : parseObject(parseObject(priorFileRun?.profile).nativeExecutionInput);
            const priorWorkingCopy = parseObject(parseObject(parseObject(priorFileInput.runtimeContext).instructions).workingCopy);
            const warmFiles = nativeRuntimeResolution.kind === "native" && (nativeRuntimeResolution.profile.backend === "codex_app_server" ||
              (nativeRuntimeResolution.profile.backend === "acpx_runtime" && parseObject(agent.adapterConfig).acpxAgent === "cursor")) &&
              (executionTarget?.kind === "remote" && executionTarget.transport === "sandbox"
                ? executionTarget.runnerLifecyclePolicy?.mode === "warm"
                : parseObject(agent.adapterConfig).lifecycleMode === "warm");
            if (warmFiles && taskSessionForRun?.lastRunId) {
              nativeInstructionReservation = await reserveWarmNativeInstructionDirectory({ companyId: agent.companyId, agentId: agent.id,
                previousRunId: taskSessionForRun.lastRunId, runId: run.id, target: executionTarget,
                canReuse: () => instructionCopies.canReuseWarm(agent.companyId, agent.id, taskSessionForRun!.lastRunId!),
              });
            }
            if (!warmFiles && nativeRuntimeResolution.kind === "native" && priorWorkingCopy.kind === "agent_files" && taskSession) {
              releaseWarmInstructionPreparation = await claimWarmNativeInstructionCopy({
                priorExecution: parseNativeExecutionInput(priorFileInput), companyId: agent.companyId, agentId: agent.id,
                executionWorkspaceId: persistedExecutionWorkspace?.id ?? run.id, workspace: executionWorkspace,
                environmentId: executionTarget?.environmentId ?? null, runId: run.id, preparationKey: instructionPreparationKey, forceRetirement: !taskSessionForRun,
                adopt: async previousRunId => {
                  instructionCopy = await instructionCopies.adopt({ companyId: agent.companyId, agentId: agent.id,
                    runId: run.id, previousRunId, target: executionTarget, cwd: executionWorkspace.cwd, allowRetirementHandoff: true });
                  return nativeInstructionWorkingCopy() ?? null;
                },
              });
              // A collection-only handoff was retired. Re-enter normal
              // preparation instead of composing a root already collected.
              if (!releaseWarmInstructionPreparation) instructionCopy = null;
            }
            const prepareInstructions = (reuseRunId?: string) => instructionCopies.prepare({
              companyId: agent.companyId, agentId: agent.id, runId: run.id,
              target: executionTarget, cwd: executionWorkspace.cwd,
              legacy: Object.keys(priorFileInput).length > 0 && priorWorkingCopy.kind !== "agent_files",
              warm: warmFiles, reuseRunId,
              onWarmHandoff: copy => {
                instructionCopy = copy;
                nativeInstructionReservation?.adopt(copy.executionRoot, collectStoppedInstructions);
              },
            });
            try {
              instructionCopy ??= await prepareInstructions(nativeInstructionReservation?.reuseRunId);
            } catch (error) {
              if (!(error instanceof AgentDirectoryReuseInvalidatedError)) throw error;
              // prepare has released its canonical lock. Retirement can now
              // collect under that same lock before a fresh restore starts.
              await nativeInstructionReservation?.release();
              nativeInstructionReservation = null;
              instructionCopy = await prepareInstructions();
            }
          } catch (error) {
            if ((error as { status?: number }).status !== 403) throw error;
            // Missing write identity must not break a background run's read-only
            // prompt. It must also never imply that ordinary file edits will save.
            await appendRunEvent(run, { eventType: "instruction_save", stream: "system", level: "warn",
              message: "Persistent instruction editing is unavailable. Use an authenticated user with instruction edit access and a managed instruction bundle.",
              payload: { state: "unavailable", code: "INSTRUCTION_COPY_UNAVAILABLE" } });
            const guidance = "No editable agent instruction working copy is registered for this turn. Use authenticated agent file tools for persistent edits; do not edit a private copy named in an earlier turn or claim its changes will persist.";
            for (const key of ["paperclipTaskMarkdown", "paperclipTaskMarkdownCompact"]) {
              context[key] = [readNonEmptyString(context[key]), guidance].filter(Boolean).join("\n\n");
            }
          }
          if (instructionCopy) {
            const storageWarning = readNonEmptyString(instructionCopy.receipt?.storageWarning);
            if (storageWarning) {
              instructionSave = { state: "prepared", contract: "agent_files", storageWarning };
              // This is an advisory on the run, never an agent pause, execution
              // failure, or scheduling gate. Keep it visible while work runs.
              await db.update(heartbeatRuns).set({ resultJson: sql`coalesce(${heartbeatRuns.resultJson}, '{}'::jsonb) || ${JSON.stringify({ instructionSave })}::jsonb` }).where(eq(heartbeatRuns.id, run.id));
              await appendRunEvent(run, { eventType: "instruction_save", stream: "system", level: "warn",
                message: storageWarning, payload: instructionSave });
            }
            runtimeConfig = { ...runtimeConfig, instructionsFilePath: path.join(instructionCopy.localRoot, instructionCopy.entryFile) };
            if (isAgentDirectoryCopy(instructionCopy)) {
              const workspace = parseObject(context.paperclipWorkspace);
              context.paperclipWorkspace = { ...workspace, agentHome: instructionCopy.executionRoot,
                // Keep the pre-existing permission root stable for ACP session
                // identity. The per-run copy is already under the company root.
                agentHomeForPermissions: workspace.agentHome,
              };
            }
            const guidance = instructionWorkingCopyGuidance(instructionCopy);
            for (const key of ["paperclipTaskMarkdown", "paperclipTaskMarkdownCompact"]) {
              context[key] = [readNonEmptyString(context[key]), guidance].filter(Boolean).join("\n\n");
            }
          }
        }
        const runtimeSelection = await selectHeartbeatRuntime(db, {
          run,
          agent,
          nativeRuntimeResolution,
          task: {
            issueRef,
            issueContext,
            context,
            executionContinuation,
            safeWakeComments,
            safeWakeCommentContext,
            paperclipWakePayload,
            acceptedPlanContinuationWake,
          },
          session: {
            persistedNativeExecutionInput,
            persistedRunnerProfile,
            taskSessionCredentialCompatible,
            taskSessionDecodedParams,
            taskSessionForRun,
            isFailedChatRunRetry,
            getFreshSessionHandoff,
          },
          workspace: {
            persistedExecutionWorkspace,
            executionWorkspace,
            executionTarget,
            activeEnvironmentLease,
            isDotRun,
            projectRepositoryPaths,
          },
          config: {
            runtimeConfig,
            runtimeSkillEntries,
            runScopedMentionedSkillKeys,
            instructionCopy,
            agentIdentity,
            issueAssigneeOverrides,
            resolvedConfig,
            managedAiRuntime,
          },
          recovery: runOptions,
          trace: { providerTraceRequested, providerTraceCapture },
          issuesSvc,
          runtimeEnv,
          beforeNativeRuntimeSelection: options.beforeNativeRuntimeSelection,
          onAdapterEvent,
          onNativeLifecycleSelected: (telemetry) => {
            nativeLifecycleTelemetryForRun = telemetry;
          },
          onProviderResourceDisposition: (disposition) => {
            providerResourceDispositionForRun = disposition;
          },
          onNativeOwnershipHeld: () => {
            nativeOwnershipHeld = true;
          },
          stopControllerLease: () => controllerLease.stop(),
        });
        if (!runtimeSelection.selected) return;
        const { nativeExecution, nativeRunnerInstanceId, getNativeFreshSessionHandoff } = runtimeSelection;
        nativeWorkspaceSync = runtimeSelection.nativeWorkspaceSync;
        const execution = await executeHeartbeatRuntime(db, {
          run, agent, options,
          task: {
            issueRef,
            issueContext,
            context,
            issueId,
            taskKey,
            executionContinuation,
          },
          runtime: {
            nativeRuntimeResolution,
            nativeExecution,
            nativeRunnerInstanceId,
            adapter,
            runtimeForAdapter,
            getNativeFreshSessionHandoff,
            getFreshSessionHandoff,
            runOptions,
          },
          workspace: {
            persistedExecutionWorkspace,
            executionWorkspace,
            executionTarget,
            workspaceOperationRecorder,
            nativeWorkspaceSync,
            workspaceRestoreSource,
            remoteExecution,
          },
          config: {
            runtimeConfig,
            resolvedConfig,
            resolvedInstanceSettings,
            configuredTaskEnvironment,
            adapterEnv,
            agentIdentity,
            managedAiRuntime,
            runtimeEnv,
            useHostGitHub,
            githubSelection,
          },
          session: {
            runtimeSessionParamsForAdapter,
            configuredModel,
            sessionConfigMetadata,
            goalCheckpointSession,
          },
          instructions: {
            nativeInstructionWorkingCopy,
            collectStoppedInstructions,
            nativeInstructionReservation,
            releaseInstructionCopy,
            get instructionCopy() { return instructionCopy; },
            getInstructionSave: () => instructionSave,
          },
          trace: {
            providerTraceCapture,
            nativeRunnerPreparationSpans,
            attestedQuestionResponseAtMs,
            attemptStartedAtMs,
            environmentAcquireStartedAtMs,
            environmentRealizeEndedAtMs,
          },
          control: {
            executionControl,
            executionPhaseContext,
            dispatchResolvedInteractionContinuationWithAtomicGate,
          },
          output: {
            identityRedactor,
            appendIdentityRedactedLog,
            onLog,
            onAdapterEvent,
            onAdapterMeta,
          },
          services: {
            executionWorkspacesSvc,
            instanceSettings,
            envOrchestrator,
            upsertTaskSession,
            getRun,
            cancelRunInternal,
            enqueueWakeup,
            persistRunProcessMetadata,
            recordCurrentHeartbeatRunRuntimeProgress,
            dispatchPendingNativeStatusWakeups,
          },
          effects: {
            onUsageCaptureReady: (value) => { persistUsageCaptureFailure = value; },
            onNativeDispatchStarted: () => { nativeDispatchStarted = true; },
            onLegacyAdapterEntered: () => { legacyAdapterEntered = true; },
            onNativeWorkspaceFinalizeScheduled: () => { nativeWorkspaceFinalizeScheduled = true; },
            onNativeSessionResumeScheduled: () => { nativeSessionResumeScheduled = true; },
            onNativeOwnershipHeld: () => { nativeOwnershipHeld = true; },
            onProviderResourceDisposition: (value) => { providerResourceDispositionForRun = value; },
            onWorkspaceRestoreFailure: (evidence) => { requiredWorkspaceRestoreEvidence = evidence; },
          },
        });
        if (!execution.dispatched) return;
        const { adapterResult } = execution;
        // Reconcile the referenced-project set against the real remote staging outcome. A referenced
        // project can pass authorization and clone locally at run prep, then fail to stage into the
        // sandbox during execution. The run-prep observability above counts such a project as synced,
        // so emit a second, stage-time line that counts each staging failure as a first-class
        // `staging` failure. The synced set is the resolved referenced projects minus the ones that
        // failed to stage. A run with no staging failure stays silent, so the anchor-only and
        // fully-synced paths add no noise.
        const referencedProjectStagingFailures =
          adapterResult.referencedProjectStagingFailures ?? [];
        if (referencedProjectStagingFailures.length > 0) {
          const stagingFailedProjectIds = new Set(
            referencedProjectStagingFailures.map(
              (failure) => failure.projectId,
            ),
          );
          const stagedProjectObservability =
            buildReferencedProjectRunObservability({
              syncedProjectIds: resolvedWorkspace.additionalWorkspaces
                .map((additional) => additional.projectId)
                .filter((projectId) => !stagingFailedProjectIds.has(projectId)),
              failures: referencedProjectStagingFailures.map((failure) => ({
                projectId: failure.projectId,
                reason: "staging" as const,
                error: failure.error,
              })),
            });
          logger.info(
            {
              runId: run.id,
              companyId: agent.companyId,
              issueId: issueRef?.id ?? null,
              ...stagedProjectObservability,
            },
            "run referenced-project remote staging",
          );
        }
        const adapterManagedRuntimeServices = adapterResult.runtimeServices
          ? await persistAdapterManagedRuntimeServices({
              db,
              adapterType: agent.adapterType,
              runId: run.id,
              agent: {
                id: agent.id,
                name: agent.name,
                companyId: agent.companyId,
              },
              issue: issueRef,
              workspace: executionWorkspace,
              reports: adapterResult.runtimeServices,
            })
          : [];
        if (adapterManagedRuntimeServices.length > 0) {
          const combinedRuntimeServices = [
            ...runtimeServices,
            ...adapterManagedRuntimeServices,
          ];
          context.paperclipRuntimeServices = combinedRuntimeServices;
          context.paperclipRuntimePrimaryUrl =
            combinedRuntimeServices.find((service) =>
              readNonEmptyString(service.url),
            )?.url ?? null;
          await db
            .update(heartbeatRuns)
            .set({
              contextSnapshot: context,
              updatedAt: new Date(),
            })
            .where(eq(heartbeatRuns.id, run.id));
          if (issueId) {
            try {
              await postWorkspaceReadyComment({
                issuesSvc,
                issueId,
                agentId: agent.id,
                runId: run.id,
                workspace: executionWorkspace,
                runtimeServices: adapterManagedRuntimeServices,
              });
            } catch (err) {
              await onLog(
                "stderr",
                `[paperclip] Failed to post adapter-managed runtime comment: ${err instanceof Error ? err.message : String(err)}\n`,
              );
            }
          }
        }
        await runCompletion.completeRun({
          run, agent, issueId, issueRef, signal: executionControl.controller.signal,
          output: {
            handle, outputProgressState, flushOutputProgress,
            get stdoutExcerpt() { return stdoutExcerpt; },
            get stderrExcerpt() { return stderrExcerpt; },
          },
          session: { runtimeForAdapter, previousSessionParams, taskKey, configuredModel, sessionConfigMetadata },
          readFailureReportSecrets,
          adapterResult, sessionCodec, taskSessionForRun, sessionCompaction,
          configFreshnessResultMetadata, runLedgerScope, currentUserRedactionOptions,
          providerTraceCapture: providerTraceCapture !== null,
          onProviderTraceFinalized: () => { providerTraceFinalized = true; },
          issueContext, onLog,
        });
      } catch (err) {
        await persistUsageCaptureFailure?.();
        if (err instanceof NativeControllerDetachedForRestartError) {
          nativeSessionResumeScheduled = true;
          return;
        }
        if (err instanceof NativeRunnerOwnershipUnverifiedError) {
          nativeOwnershipHeld = true;
          const heldRun = await getRun(run.id);
          if (heldRun)
            await markNativeOwnershipUnverified(heldRun, {
              reason: err.reason,
            });
          return;
        }
        if (err instanceof NativeCancellationPendingRecoveryError) {
          await cancelRunInternal(
            run.id,
            "Recovered durable native run cancellation",
          );
          return;
        }
        if (err instanceof NativeSessionResumeScheduledError) {
          const retryMessage =
            err.original instanceof Error
              ? err.original.message
              : String(err.original ?? "");
          const retryReasonCode = /native_finalization_missing/i.test(
            retryMessage,
          )
            ? "semantic_result_missing"
            : "native_session_interrupted";
          const coordinator = await db
            .select({
              nextAttemptAt: nativeRunFinalizations.nextAttemptAt,
              attempt: nativeRunFinalizations.attempt,
              failureDetail: nativeRunFinalizations.failureDetail,
            })
            .from(nativeRunFinalizations)
            .where(eq(nativeRunFinalizations.runId, run.id))
            .limit(1)
            .then((rows) => rows[0] ?? null);
          await appendRunEvent(run, {
            eventType: "lifecycle",
            stream: "system",
            level: "warn",
            message:
              retryReasonCode === "semantic_result_missing"
                ? "provider turn completed without a semantic result; same-run disposition recovery persisted"
                : "native session transport interrupted; same-run resume persisted",
            payload: {
              attempt: coordinator?.attempt ?? null,
              nextAttemptAt: coordinator?.nextAttemptAt?.toISOString() ?? null,
              fallbackSuppressed: true,
              retryReasonCode,
              // The executor has already redacted and bounded this diagnostic
              // before persisting it. Retain it on the immutable transition
              // event as well: a same-run retry reopens the log stream, so the
              // first attempt's stderr must not be the only explanation for
              // why a live warm runner was replaced.
              failureDetail: coordinator?.failureDetail ?? null,
            },
          }).catch(() => undefined);
          if (coordinator?.nextAttemptAt) {
            scheduleNativeSessionResumeDispatch(
              run.id,
              coordinator.nextAttemptAt,
            );
          }
          return;
        }
        if (err instanceof NativeWorkspaceFinalizationBusyError
          || err instanceof NativeWorkspaceFinalizationOwnershipLostError) {
          // Another exact owner is finishing copyback, or this owner lost its
          // lock connection. Preserve the accepted result and let reconciliation
          // inspect durable ownership; neither case consumes an export retry.
          logger.info({ runId: run.id, reason: err.message }, "native workspace finalization deferred to its durable owner");
          return;
        }
        if (err instanceof NativeWorkspaceFinalizeScheduledError) {
          const coordinator = await db
            .select({
              nextAttemptAt: nativeRunFinalizations.nextAttemptAt,
              attempt: nativeRunFinalizations.attempt,
            })
            .from(nativeRunFinalizations)
            .where(eq(nativeRunFinalizations.runId, run.id))
            .limit(1)
            .then((rows) => rows[0] ?? null);
          await appendRunEvent(run, {
            eventType: "lifecycle",
            stream: "system",
            level: err.terminalFailure ? "error" : "warn",
            message: err.terminalFailure
              ? err.reasonCode === "workspace_sync_out_failed"
                  ? "native result is durable; automatic workspace copy-back retries stopped and saved work is retained for export repair"
                  : "native result is durable, but the sandbox containing unexported workspace changes is unrecoverable"
              : "native result is durable; workspace copy-back will retry without another provider turn",
            payload: {
              attempt: coordinator?.attempt ?? null,
              nextAttemptAt: coordinator?.nextAttemptAt?.toISOString() ?? null,
              fallbackSuppressed: true,
              retryReasonCode: err.reasonCode,
            },
          }).catch(() => undefined);
          if (err.terminalFailure) {
            // The durable coordinator already failed the run, blocked the
            // issue, and cleared its execution lock. Let ordinary teardown
            // release the lease while retaining the sandbox and its unexported work.
            nativeWorkspaceFinalizeScheduled = false;
            providerResourceDispositionForRun = "stop_and_retain";
            await finalizeAgentStatus(
              run.agentId,
              "failed",
              `native_${err.reasonCode}`,
              { wasFirstHeartbeat: timerClaimWasFirstHeartbeat(run) },
            ).catch(() => undefined);
          }
          return;
        }
        await runCompletion.failRun({
          run, agent, issueId, issueRef, signal: executionControl.controller.signal,
          output: {
            handle, outputProgressState, flushOutputProgress,
            get stdoutExcerpt() { return stdoutExcerpt; },
            get stderrExcerpt() { return stderrExcerpt; },
          },
          session: { runtimeForAdapter, previousSessionParams, taskKey, configuredModel, sessionConfigMetadata },
          readFailureReportSecrets,
          runId, err, identityRedactor, requiredWorkspaceRestoreEvidence, legacyAdapterEntered,
          goalCheckpointSession, previousSessionDisplayId, taskSession,
        });
      }
    } catch (outerErr) {
      if (
        nativeOwnershipHeld ||
        outerErr instanceof NativeRunnerOwnershipUnverifiedError
      ) {
        nativeOwnershipHeld = true;
        const heldRun = await getRun(run.id).catch(() => null);
        if (heldRun)
          await markNativeOwnershipUnverified(heldRun, {
            reason:
              outerErr instanceof NativeRunnerOwnershipUnverifiedError
                ? outerErr.reason
                : "adopted_runner_authentication_timeout",
          }).catch(() => undefined);
      } else if (outerErr instanceof StaleExecutionContinuationError) {
        // The queued continuation became obsolete before adapter dispatch.
        // Use cancellation settlement so wakeup, issue ownership, agent state,
        // and notifications agree; do not retry work for the previous owner.
        await cancelRunInternal(run.id, outerErr.code, {
          errorCode: outerErr.code,
          eventMessage: "stale execution continuation cancelled before dispatch",
          suppressImmediateRecovery: true,
        });
      } else if (isWorkspaceBusyDeferral(outerErr)) {
        // Expected contention on a shared project workspace, not a
        // failure: park the run as a bounded scheduled retry and leave the
        // holder undisturbed. The finally block below still releases
        // leases, runtime services, and scratch for this run.
        await finalizeWorkspaceBusyDeferral(run, outerErr).catch(
          (deferralErr) => {
            logger.error(
              { err: deferralErr, runId },
              "failed to finalize workspace-busy deferral",
            );
          },
        );
      } else {
        await runCompletion.failRunSetup({
          run, runId, outerErr, identityRedactor, readFailureReportSecrets,
        });
      }
    } finally {
      await nativeInstructionReservation?.release().catch(error => logger.warn({ runId: run.id, err: error }, "Managed warm session preparation cleanup failed"));
      if (managedAiRuntime) await managedAiRuntime.cleanup().catch(() => logger.warn({ runId: run.id }, "AI connection refresh or cleanup failed"));
      let latestRun = await getRun(run.id).catch(() => null);
      try {
        if (latestRun && isHeartbeatRunTerminalStatus(latestRun.status)) {
          await db
            .update(heartbeatRuns)
            .set({ executionControlDeadlineAt: null })
            .where(eq(heartbeatRuns.id, run.id));
        }
        nativeOwnershipHeld =
          nativeOwnershipHeld ||
          Boolean(latestRun && isNativeRunnerOwnershipHeld(latestRun));
        // Trace capture is debug-only and must settle independently of every
        // provider outcome. Adapter/setup failures used to skip the success-path
        // finalizer, leaving metadata permanently stuck at `capturing` even when
        // runnerd had already closed (or never managed to write) its sidecar.
        // Same-run native resumes retain the open capture until the resumed
        // execution reaches a true terminal boundary.
        if (
          providerTraceCapture &&
          !providerTraceFinalized &&
          !nativeSessionResumeScheduled
        ) {
          try {
            await traceStore.finalize(run.id, run.companyId);
            providerTraceFinalized = true;
          } catch (traceFinalizeError) {
            logger.warn(
              { err: traceFinalizeError, runId: run.id },
              "provider trace finalization failed during heartbeat teardown",
            );
          }
        }
        // Close the invariant "environment lease released implies the run is
        // terminal". When the teardown reaches this point with the run still
        // running or queued, force a terminal status before the lease is
        // released, so the UI never shows a finished task as "Live".
        if (
          latestRun &&
          !nativeSessionResumeScheduled &&
          !nativeWorkspaceFinalizeScheduled &&
          !nativeOwnershipHeld
        ) {
          latestRun = await terminalizeRunOnLeaseRelease(latestRun).catch(
            (terminalizeErr) => {
              logger.error(
                { err: terminalizeErr, runId: run.id },
                "failed to terminalize run before environment lease release",
              );
              return latestRun;
            },
          );
        }
        // Warm retention is earned only by a fully successful turn. A failed,
        // cancelled, or timed-out run stops the reusable sandbox so the next
        // acquisition must revalidate and explicitly resume it.
        nativeOwnershipHeld =
          nativeOwnershipHeld ||
          Boolean(latestRun && isNativeRunnerOwnershipHeld(latestRun));
        providerResourceDispositionForRun =
          providerResourceDispositionForTerminalRun(
            providerResourceDispositionForRun,
            latestRun?.status,
          );
        if (
          !nativeSessionResumeScheduled &&
          !nativeWorkspaceFinalizeScheduled &&
          !nativeOwnershipHeld
        ) {
          // Keep launchers during same-run recovery. At a terminal boundary all
          // operations have settled; clean before the remote lease can be stopped.
          if (
            githubLauncherLocation &&
            latestRun &&
            isHeartbeatRunTerminalStatus(latestRun.status)
          ) {
            await cleanupGitHubOperationLaunchers(githubLauncherLocation).catch(
              (err) => {
                logger.warn(
                  { err, runId: run.id },
                  "failed to clean managed GitHub launchers",
                );
              },
            );
          }
          // A retained or unverified process stays above this release boundary.
          // If no stopped-copy capture occurred, preserve an explicit loss report.
          await releaseWarmInstructionPreparation?.();
          const uncapturedInstructions = await instructionCopies.reportUnavailable(run.companyId, run.id);
          if (uncapturedInstructions?.state === "unavailable") {
            await appendRunEvent(run, { eventType: "instruction_save", stream: "system", level: "warn",
              message: "Instruction edits could not be recovered before environment release. No instruction save is claimed.",
              payload: { state: "unavailable", code: uncapturedInstructions.errorCode } });
          }
          await withAdapterExecutionPhase(executionPhaseContext, "instruction_cleanup", releaseInstructionCopy);
          await withAdapterExecutionPhase(executionPhaseContext, "lease_release", () => releaseEnvironmentLeasesForRun({
            runId: run.id,
            companyId: run.companyId,
            agentId: run.agentId,
            status: latestRun?.status,
            failureReason: latestRun?.error ?? undefined,
            providerResourceDisposition: providerResourceDispositionForRun,
            nativeLifecycleTelemetry: nativeLifecycleTelemetryForRun,
          }));
          await releaseRuntimeServicesForRun(run.id).catch(() => undefined);
        }
        if (
          runScratch &&
          latestRun &&
          isHeartbeatRunTerminalStatus(latestRun.status)
        ) {
          const scratchForCleanup = runScratch;
          let scratchCleanup: Awaited<
            ReturnType<typeof cleanupHeartbeatRunScratch>
          > | null = null;
          try {
            scratchCleanup = await cleanupHeartbeatRunScratch({
              scratch: scratchForCleanup,
              processGroupId: latestRun.processGroupId,
              isProcessGroupAlive,
            });
          } catch (scratchCleanupError) {
            logger.warn(
              {
                err: scratchCleanupError,
                runId: run.id,
                scratchDir: scratchForCleanup.dir,
              },
              "failed to clean heartbeat run scratch directory",
            );
            await appendRunEvent(latestRun, {
              eventType: "error",
              stream: "system",
              level: "warn",
              message: "run scratch cleanup failed",
              payload: {
                dir: scratchForCleanup.dir,
                error:
                  scratchCleanupError instanceof Error
                    ? scratchCleanupError.message
                    : String(scratchCleanupError),
              },
            }).catch(() => undefined);
          }
          if (scratchCleanup) {
            await appendRunEvent(latestRun, {
              eventType: "lifecycle",
              stream: "system",
              level: scratchCleanup.removed ? "info" : "warn",
              message: scratchCleanup.removed
                ? "run scratch cleaned"
                : `run scratch cleanup skipped: ${scratchCleanup.reason}`,
              payload: scratchCleanup,
            }).catch((scratchCleanupEventError) => {
              logger.warn(
                {
                  err: scratchCleanupEventError,
                  runId: run.id,
                  scratchDir: scratchForCleanup.dir,
                },
                "failed to record heartbeat run scratch cleanup event",
              );
            });
          }
        }
        if (latestRun?.status === "interrupted" && latestRun.errorCode === "server_shutdown_interrupted") {
          latestRun = await settleInterruptedNativeBootstrap(db, { run: latestRun,
            providerDispatchStarted: legacyAdapterEntered || nativeDispatchStarted || nativeOwnershipHeld,
          }) ?? latestRun;
        }
        if (latestRun?.status === "cancelled" && !nativeDispatchStarted && !nativeOwnershipHeld &&
            (latestRun.runtimeMode === "native" ||
              parseObject(latestRun.resultJson?.startupCancellation).beforeNativeSelection === true)) {
          // This executor has finished preparation and lease cleanup without
          // handing off to native execution. Keep a durable receipt for admission
          // after a restart; cleanup receipts are independently rechecked there.
          await db.update(heartbeatRuns).set({
            resultJson: sql`coalesce(${heartbeatRuns.resultJson}, '{}'::jsonb) ||
              ${JSON.stringify({ startupPreparationSettledAt: new Date().toISOString() })}::jsonb`,
          }).where(and(eq(heartbeatRuns.id, run.id), eq(heartbeatRuns.status, "cancelled")));
        }
        await db.update(heartbeatRuns).set({
          executionStage: sql`case when ${heartbeatRuns.status} = 'cancelled' then 'settled' else ${heartbeatRuns.executionStage} end`,
          controllerLeaseExpiresAt: null,
        }).where(and(eq(heartbeatRuns.id, run.id), eq(heartbeatRuns.runtimeMode, "legacy"),
          eq(heartbeatRuns.controllerBootId, legacyControllerBootId),
          inArray(heartbeatRuns.status, ["succeeded", "failed", "cancelled", "timed_out", "interrupted"])));

      } finally {
        controllerLease.stop();
        activeRunExecutions.delete(run.id);
        // A failed owned Stop remains visible until this exact executor settles,
        // including a graceful exit result arriving after the cancellation error.
        // It is never retained beyond the active execution's cleanup.
        failedProcessRunCancellations.delete(run.id);
        executionControl.finish();
        if (adapterExecutionControls.get(run.id) === executionControl) {
          adapterExecutionControls.delete(run.id);
        }
      }
      // Terminalization precedes lease and adapter cleanup. Only now is the
      // owner gone; retry pending input for ordinary completions as well as Stop.
      if (latestRun?.runtimeMode === "legacy" && ["failed", "timed_out"].includes(latestRun.status) &&
          latestRun.contextSnapshot?.explicitUserContinuation) {
        // Re-run the same queue-first recovery decision after cleanup. Its
        // earlier retry request could not authorize work while this executor
        // still held its controller or environment lease.
        await releaseIssueExecutionAndPromote(latestRun).catch(err => {
          logger.error({ err, runId: run.id }, "failed to settle explicit continuation after cleanup");
        });
      }
      if (latestRun?.runtimeMode === "legacy" && isHeartbeatRunTerminalStatus(latestRun.status)) {
        const [pending] = await db.select({ id: agentWakeupRequests.id, payload: agentWakeupRequests.payload }).from(agentWakeupRequests).where(and(
          eq(agentWakeupRequests.companyId, run.companyId), eq(agentWakeupRequests.agentId, run.agentId),
          eq(agentWakeupRequests.status, "deferred_issue_execution"),
          sql`${agentWakeupRequests.payload}->>'issueId' = ${String(latestRun.contextSnapshot?.issueId)}`,
        )).limit(1);
        if (pending) await (pending.payload?.queuedCommentInterrupt
          ? resumeQueuedCommentInterrupt(run.companyId, pending.id)
          : releaseIssueExecutionAndPromote(latestRun, { suppressImmediateRecovery: true })).catch(err => {
          logger.error({ err, runId: run.id }, "failed to promote legacy comment queue after cleanup");
        });
      }
      if (
        !nativeSessionResumeScheduled &&
        !nativeWorkspaceFinalizeScheduled &&
        !shutdownInProgress
      ) {
        if (latestRun) await resumeRemoteStopComments(latestRun).catch(err => {
          logger.warn({ err, runId: run.id }, "failed to resume user messages after remote Stop");
        });
        if (latestRun && isHeartbeatRunTerminalStatus(latestRun.status)) {
          await toolActionDeliveryService(db, { wakeup: trackWakeup })
            .deliverForRun({ companyId: run.companyId, runId: run.id })
            .catch(err => {
              logger.warn({ err, runId: run.id }, "failed to deliver settled tool reviews after execution cleanup");
            });
        }
        await startNextQueuedRunForAgent(run.agentId);
      }
    }
  }

  async function stopInvocationsForAgents(agentIds: string[], reason: string) {
    await cancelInvocationsForAgentsInternal(agentIds, reason);
    const runs = await db.select().from(heartbeatRuns).where(inArray(heartbeatRuns.agentId, agentIds));
    const leasesToRelease = await db.select({ runId: environmentLeases.heartbeatRunId }).from(environmentLeases)
      .innerJoin(heartbeatRuns, eq(heartbeatRuns.id, environmentLeases.heartbeatRunId))
      .where(and(inArray(heartbeatRuns.agentId, agentIds),
        or(and(eq(heartbeatRuns.status, "cancelled"), inArray(environmentLeases.status, ["active", "pending_cleanup"])),
          and(eq(environmentLeases.status, "retained"), eq(environmentLeases.cleanupStatus, "failed")))));
    const needsRelease = new Set(leasesToRelease.map(lease => lease.runId));
    for (const run of runs) {
      if (!isHeartbeatRunTerminalStatus(run.status) || liveRunExecutions.has(run.id) ||
          adapterExecutionControls.has(run.id) || processRunCancellationSettlements.has(run.id) ||
          (run.controllerLeaseExpiresAt && run.controllerLeaseExpiresAt > new Date())) return false;
      if (needsRelease.has(run.id)) {
        // Retry incomplete cleanup after a run becomes terminal.
        await releaseEnvironmentLeasesForRun({ runId: run.id, companyId: run.companyId,
          agentId: run.agentId, status: run.status, providerResourceDisposition: "destroy" });
      }
    }
    return agentExecutionsHaveStopped(db, agentIds);
  }

  return {
    stopInvocationsForAgents,
    waitForRunExecutionDrain: async (
      runId: string,
      options: { timeoutMs?: number; intervalMs?: number } = {},
    ) => {
      const timeoutMs = options.timeoutMs ?? 5_000;
      const intervalMs = options.intervalMs ?? 25;
      const deadline = Date.now() + timeoutMs;

      while (liveRunExecutions.has(runId)) {
        if (Date.now() >= deadline) {
          throw new Error(
            `Timed out waiting for heartbeat run ${runId} execution to drain`,
          );
        }
        await new Promise((resolve) => setTimeout(resolve, intervalMs));
      }
    },
    list: listRuns,

    getRun,

    decorateActiveRunStatus: decorateHeartbeatRunRuntimeStatus,
    recordRuntimeProgress: recordCurrentHeartbeatRunRuntimeProgress,
    sweepExpiredRuntimeStatuses: sweepExpiredHeartbeatRunRuntimeStatuses,

    getRunLogAccess,

    getRuntimeState: getRuntimeStateWithSessions,

    listTaskSessions,

    resetRuntimeSession,

    listEvents,

    getRetryExhaustedReason,

    readLog: async (
      runOrLookup:
        | string
        | {
            id: string;
            companyId: string;
            logStore: string | null;
            logRef: string | null;
          },
      opts?: { offset?: number; limitBytes?: number },
    ) => {
      const run =
        typeof runOrLookup === "string"
          ? await getRunLogAccess(runOrLookup)
          : runOrLookup;
      const runId =
        typeof runOrLookup === "string" ? runOrLookup : runOrLookup.id;
      if (!run) throw notFound("Heartbeat run not found");
      if (!run.logStore || !run.logRef) throw notFound("Run log not found");

      const result = await runLogStore.read(
        {
          store: run.logStore as "local_file",
          logRef: run.logRef,
        },
        opts,
      );

      return {
        runId,
        store: run.logStore,
        logRef: run.logRef,
        ...result,
        // Run-log chunks are already redacted before they are appended to the store.
        // Rewriting the full chunk again on every poll creates avoidable string copies.
        content: result.content,
      };
    },

    invoke: async (
      agentId: string,
      source: "timer" | "assignment" | "on_demand" | "automation" = "on_demand",
      contextSnapshot: Record<string, unknown> = {},
      triggerDetail: "manual" | "ping" | "callback" | "system" = "manual",
      actor?: {
        actorType?: "user" | "agent" | "system";
        actorId?: string | null;
      },
    ) =>
      trackWakeup(agentId, {
        source,
        triggerDetail,
        contextSnapshot,
        requestedByActorType: actor?.actorType,
        requestedByActorId: actor?.actorId ?? null,
      }),

    wakeup: trackWakeup,
    dispatchPendingNativeStatusWakeups,
    triggerIssueMonitor,

    reportRunActivity: clearDetachedRunWarning,

    prepareHotRestartShutdown,
    reconcileHotRestartAdoption,
    recoverNativeRunsAfterRestart,
    reapOrphanedRuns,
    sweepOrphanedActiveLeases,
    sweepPendingCleanupLeases,
    // Override-aware scheduling-suppression check (honors the worktree
    // run-execution experimental setting). Callers outside the service that
    // gate on suppression should prefer this over the env-only resolver.
    resolveSchedulingSuppression: getSchedulingSuppression,
    drainRunningRunsForShutdown,
    drainActiveRunExecutions,
    startTaskDrain,
    stopTaskDrain,
    getTaskDrainStatus,
    computeTaskDrain,
    applyTaskDrain,

    promoteDueScheduledRetries,
    retryScheduledRetryNow,

    resumeQueuedRuns,

    resumeQueuedRunsForAgent: async (companyId: string, agentId: string) => {
      const agent = await getAgent(agentId);
      if (!agent || agent.companyId !== companyId) return [];
      return startNextQueuedRunForAgent(agentId);
    },

    scheduleBoundedRetry,

    reconcileStrandedAssignedIssues,
    recoverPendingSessionGoalActions,
    recoverActiveSessionGoals,

    terminalizeRunOnLeaseRelease,

    releaseEnvironmentLeasesForRun,
    resumeRemoteStopComments,
    resumeQueuedCommentInterrupt,
    resumeExecutionWaitComments,

    sweepStaleIssueLocks,

    reconcileResolvedDependencyWakes,

    scanSilentActiveRuns,

    reconcileTaskWatchdogs,
    reconcileCostAccounting: async () => {
      await decisionModelService(db, { budgetHooks }).recoverInterrupted();
      return createCostAccountingReconciler(db, budgetHooks)();
    },

    buildRunOutputSilence,

    tickTimers,

    cancelRun: (runId: string, reason?: string, options?: CancelRunOptions) =>
      cancelRunInternal(runId, reason, options),

    /**
     * Pause-only. Emits errorCode "agent_paused" unconditionally; its sole caller is the
     * agent pause route. For non-pause cancellations use cancelRun, or call the internal
     * cancelActiveForAgentInternal(agentId, reason, errorCode) with an explicit errorCode.
     */
    cancelActiveForAgent: (agentId: string, reason?: string) =>
      cancelActiveForAgentInternal(agentId, reason, "agent_paused"),

    cancelInvocationsForAgents: (agentIds: string[], reason: string) =>
      cancelInvocationsForAgentsInternal(agentIds, reason),

    cancelBudgetScopeWork,

    getRunIssueSummary,

    getActiveRunForAgent,

    getActiveRunIssueSummaryForAgent,
  };
}
