export default function quad4solve(a, b, c, d, e) {
    e = e / 1080
    let result = {
        x1: {
            Re: 0,
            Im: 0
        },
        x2: {
            Re: 0,
            Im: 0
        },
        x3: {
            Re: 0,
            Im: 0
        },
        x4: {
            Re: 0,
            Im: 0
        }
    }
	// var a = parseFloat(dataForm.aIn.value);
	// var b = parseFloat(dataForm.bIn.value);
	// var c = parseFloat(dataForm.cIn.value);
	// var d = parseFloat(dataForm.dIn.value);
	// var e = parseFloat(dataForm.eIn.value);
	if (a == 0)
	{
		// alert("The coefficient of the power four of x is 0. Please use the utility for a third degree quadratic.");
		return;
	}
	if (e == 0)
	{
		// alert("One root is 0. Now divide through by x and use the utility for a third degree quadratic to solve the resulting equation for the other three roots.");
		return;
	}
	if (a != 1)
	{
		b /= a;
		c /= a;
		d /= a;
		e /= a;
	}

// Coefficients for cubic solver
	var cb, cc, cd;
	var discrim, q, r, RRe, RIm, DRe, DIm, dum1, ERe, EIm, s, t, term1, r13, sqR, y1, z1Re, z1Im, z2Re;
	cb = -c;
	cc = -4.0*e + d*b;
	cd = -(b*b*e + d*d) + 4.0*c*e;
	if (cd == 0)
	{
		// alert("cd = 0.");
	}
	q = (3.0*cc - (cb*cb))/9.0;
	r = -(27.0*cd) + cb*(9.0*cc - 2.0*(cb*cb));
	r /= 54.0;
	discrim = q*q*q + r*r;
	term1 = (cb/3.0);
	if (discrim > 0)
	{
// 1 root real, 2 are complex
		s = r + Math.sqrt(discrim);
		s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)));
		t = r - Math.sqrt(discrim);
		t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)));
		y1 = -term1 + s + t;
		}
		else
		{
			if (discrim == 0)
			{
				r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
				y1 = -term1 + 2.0*r13;
			}
			else
			{
				q = -q;
				dum1 = q*q*q;
				dum1 = Math.acos(r/Math.sqrt(dum1));
				r13 = 2.0*Math.sqrt(q);
				y1 = -term1 + r13*Math.cos(dum1/3.0);
			}
		}
// Determined y1, a real root of the resolvent cubic.
		term1 = b/4.0;
		sqR = -c + term1*b + y1;
		RRe = RIm = DRe = DIm = ERe = EIm = z1Re = z1Im = z2Re = 0;
		if (sqR >= 0)
		{
			if (sqR == 0)
			{
				dum1 = -(4.0*e) + y1*y1;
				if (dum1 < 0) //D and E will be complex
	   			z1Im = 2.0*Math.sqrt(-dum1);
				else
				{                      //else (dum1 >= 0)
	  				z1Re = 2.0*Math.sqrt(dum1);
					z2Re = -z1Re;
				}
			}
			else
			{
			RRe = Math.sqrt(sqR);
			z1Re = -(8.0*d + b*b*b)/4.0 + b*c;
			z1Re /= RRe;
			z2Re = -z1Re;
		 }
	}
	else
	{
		RIm = Math.sqrt(-sqR);
		z1Im = -(8.0*d + b*b*b)/4.0 + b*c;
		z1Im /= RIm;
		z1Im = -z1Im;
	}
	z1Re += -(2.0*c + sqR) + 3.0*b*term1;
	z2Re += -(2.0*c + sqR) + 3.0*b*term1;

//At this point, z1 and z2 should be the terms under the square root for D and E
	if (z1Im == 0)
	{               // Both z1 and z2 real
		if (z1Re >= 0)
		{
			DRe = Math.sqrt(z1Re);
		}
		else
		{
			DIm = Math.sqrt(-z1Re);
		}
		if (z2Re >= 0)
		{
			ERe = Math.sqrt(z2Re);
		}
		else
		{
			EIm = Math.sqrt(-z2Re);
		}
	}
	else
	{
		r = Math.sqrt(z1Re*z1Re + z1Im*z1Im);
		r = Math.sqrt(r);
		dum1 = Math.atan2(z1Im, z1Re);
		dum1 /= 2; //Divide this angle by 2
		ERe = DRe = r*Math.cos(dum1);
		DIm = r*Math.sin(dum1);
		EIm = -DIm;
	}
	result.x1.Re = -term1 + (RRe + DRe)/2;
	result.x1.Im = (RIm + DIm)/2;
	result.x2.Re = -(term1 + DRe/2) + RRe/2;
	result.x2.Im = (-DIm + RIm)/2;
	result.x3.Re = -(term1 + RRe/2) + ERe/2;
	result.x3.Im = (-RIm + EIm)/2;
	result.x4.Re = -(term1 + (RRe + ERe)/2);
	result.x4.Im = -(RIm + EIm)/2;
	return result;
}
