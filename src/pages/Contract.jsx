export default function Contract({ clientData }) {
  
  // Format date as DD MMM YYYY (e.g., 09 Jun 2026)
  const formatDate = (isoString) => {
    if (!isoString) return 'Pending Signature';
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const contractText = `AUTOMAITEE SERVICE AGREEMENT

This Service Agreement (the "Agreement") is entered into by and between Automaitee Digital ("Service Provider") and the Client details listed below:

CLIENT DETAILS:
Client Representative: ${clientData.name}
Company Name: ${clientData.company}
Service Plan: ${clientData.plan}
Effective Date: ${clientData.createdAt ? formatDate(clientData.createdAt) : 'N/A'}

1. SERVICE DESCRIPTION
Service Provider agrees to deploy and maintain custom AI and API automation integrations, reporting dashboards, and marketing synchronization hooks as described in the "${clientData.plan}".

2. PAYMENT TERMS
Billing occurs automatically on a recurring monthly subscription basis. Invoices are generated at the start of each service month and are viewable inside the Client Portal.

3. NOTICE AND CANCELLATION
Cancellation requests must be submitted through the portal. Subject to plan specifications, cancellation of recurring services requires a 30-day notice period.

4. CONFIDENTIALITY & PROPRIETARY RIGHTS
Both parties agree to treat all business operational data, customer databases, and automation logic configurations accessed or created during the performance of services as proprietary and confidential.

5. DIGITAL SIGNATURE COMPLIANCE
This agreement is executed digitally. The Client's checkbox selection and legal name signature, timestamped and stored inside the secure database, serves as full legal execution of this Agreement.`;

  return (
    <div className="max-w-4xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-bold text-gray-900">Service agreement</h1>
          <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
            View only
          </span>
        </div>
      </div>

      {/* Contract text */}
      <div className="p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-[400px] overflow-y-auto font-mono text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">
          {contractText}
        </div>
      </div>

      {/* Acceptance Record */}
      <div className="p-6 border-t border-gray-200 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Acceptance Audit Record</h3>
        
        <div className="space-y-4 max-w-xl">
          <div className="flex items-start space-x-3">
            <input
              id="accepted-tc"
              type="checkbox"
              checked={clientData.tcAccepted}
              disabled
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-not-allowed"
            />
            <label htmlFor="accepted-tc" className="text-sm text-gray-700 font-medium cursor-not-allowed">
              I have read and agree to the terms and conditions
            </label>
          </div>

          <div>
            <label htmlFor="signature-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Full Name Signature
            </label>
            <input
              id="signature-name"
              type="text"
              value={clientData.tcAcceptedName || ''}
              disabled
              placeholder="Not Signed"
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 cursor-not-allowed"
            />
          </div>

          {clientData.tcAccepted && (
            <p className="text-xs text-gray-500 font-medium">
              Accepted on <strong className="text-gray-700">{formatDate(clientData.tcAcceptedDate)}</strong> &bull; Cannot be changed
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
