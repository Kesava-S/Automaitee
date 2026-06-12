import { FileText, Lock } from 'lucide-react';

export default function Contract({ clientData }) {

  const formatDate = (isoString) => {
    if (!isoString) return 'Pending Signature';
    const date   = new Date(isoString);
    const day    = String(date.getDate()).padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const contractText = `AUTOMAITEE SERVICE AGREEMENT

This Service Agreement (the "Agreement") is entered into by and between Automaitee Digital ("Service Provider") and the Client details listed below:

CLIENT DETAILS:
Client Representative: ${clientData.name}
Company Name: ${clientData.company}
Service Plan: ${clientData.plan}
Effective Date: ${clientData.createdAt ? formatDate(clientData.createdAt) : 'N/A'}
Expiry Date: ${clientData.contractExpiryDate ? formatDate(clientData.contractExpiryDate) : 'N/A'}

1. SERVICE DESCRIPTION
Service Provider agrees to deploy and maintain custom AI and API automation integrations, reporting dashboards, and marketing synchronization hooks as described in the "${clientData.plan}".
${clientData.customServices && clientData.customServices.length > 0 ? `
The following additional services have been appended to this agreement by addendum:
${clientData.customServices.map((svc) => ` - ${svc}`).join('\n')}` : ''}

2. PAYMENT TERMS
Billing occurs automatically on a recurring monthly subscription basis. Invoices are generated at the start of each service month and are viewable inside the Client Portal.

3. NOTICE AND CANCELLATION
Cancellation requests must be submitted through the portal. Subject to plan specifications, cancellation of recurring services requires a 30-day notice period.

4. CONFIDENTIALITY & PROPRIETARY RIGHTS
Both parties agree to treat all business operational data, customer databases, and automation logic configurations accessed or created during the performance of services as proprietary and confidential.

5. DIGITAL SIGNATURE COMPLIANCE
This agreement is executed digitally. The Client's checkbox selection and legal name signature, timestamped and stored inside the secure database, serves as full legal execution of this Agreement.`;

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        {/* Header */}
        <div className="px-5 lg:px-7 py-4 lg:py-5 border-b border-gray-200 flex items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0">
              <FileText className="h-4.5 w-4.5 text-gray-400" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900">Service Agreement</h1>
              <p className="text-xs text-gray-400 mt-0.5">{clientData.company} — {clientData.plan}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1.5 rounded-lg border border-gray-200">
            <Lock className="h-3 w-3" strokeWidth={2.5} />
            <span>View only</span>
          </div>
        </div>

        {/* Contract text */}
        <div className="p-4 lg:p-7">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 lg:p-6 h-[340px] lg:h-[420px] overflow-y-auto font-mono text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">
            {contractText}
          </div>
        </div>

      </div>
    </div>
  );
}
